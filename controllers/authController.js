const JWT_SECRET = "mySuperSecretKey123";
const JWT_EXPIRES_IN = "7d";

const passport = require('passport');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const otpGenerate = require('otp-generator');
const transporter = require('../utils/mail');
const saltRounds = 10;

const signUpController = (req, res) => {
    console.log("sign up page...")
    // const user = 
    return res.render('signUp', { errors: [], formData: {} })
}

const signUpUser = async (req, res) => {

    try {
        const { userName, userEmail, userPassword, confirmPassword } = req.body;
        const errors = [];
        console.log("SignUp Body: ", req.body)
        if (userPassword !== confirmPassword) {
            errors.push('Password and confirm password do not match')
        }
        const existing = await User.findOne({ email: userEmail })
        if (existing) {
            errors.push("Email already registered.");
        }
        if (errors.length) {
            return res.status(400).render('signUp', { errors, formData: req.body })
        }

        const hashedPassword = await bcrypt.hash(userPassword, saltRounds)

        const newUser = new User({
            name: userName,
            email: userEmail,
            password: hashedPassword,
            confirmPassword: hashedPassword
        })
        console.log("After new user: ")

        await newUser.save();
        console.log("New User: ", newUser)
        return res.redirect('/login')

    } catch (err) {
        console.log('signUpUser error: ', err)
        return res.status(500).render('signUp', { errors: ['Server error'], formData: req.body })
    }
}

const loginController = (req, res) => {
    console.log("Login page ---->>>>")
    res.render('login', { userEmail: "" })
}

const forgotPasswordController = async (req, res) => {
    console.log("forgot password ---->>>");
    res.render('forgotpassword');
}

const verifyUserController = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.send("User not found.");
    }

    const otp = otpGenerate.generate(6);
    console.log("OTP is:", otp);

    user.otp = otp;          // Save OTP in user
    await user.save();

    let mail = await transporter.sendMail({
        from: "bigflymakeover@gmail.com",
        to: req.body.email,
        subject: "Mail reset OTP",
        text: `Your OTP is: ${otp}
This code will expire in 5 minutes.
Never share your OTP with anyone — our team will never ask for it.
`,
    }, (err, info) => {
        if (!err) {
            console.log(info.envelope);
            console.log(info.messageId);
        } else {
            console.error(err);
            return;
        }
    })

    res.render('otpverify', { userId: user._id });
}

const otpVerifyController = async (req, res) => {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.send("User not found");

    if (user.otp !== otp) {
        return res.send("Invalid OTP!");
    }

    // OTP correct 
    user.otp = null;
    await user.save();

    // Move to reset-password page
    res.render('resetpassword', { userId });
}

const resetPasswordController = async (req, res) => {
    const { userId, password, confpassword } = req.body;

    if (password !== confpassword) {
        return res.send("Passwords do not match!");
    }
    const user = await User.findById(userId);
    if (!user) return res.send("User not found!");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save password
    user.password = hashedPassword;
    await user.save();

    res.redirect('login');
};

const logOutController = async (req, res) => {
    console.log("logout page -----///////");
    res.clearCookie('token');
    res.redirect('login')
}

module.exports = { signUpController, signUpUser, loginController, logOutController, forgotPasswordController, verifyUserController, otpVerifyController, resetPasswordController }
