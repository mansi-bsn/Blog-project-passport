const JWT_SECRET = "mySuperSecretKey123";
const JWT_EXPIRES_IN = "7d";  

const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

const loginUser = async (req, res) => {
    try {
        // console.log("req login body: ", req.body);

        const { userEmail, userPassword } = req.body;
        console.log("req body login --->>>", req.body);
        const user = await User.findOne({ email: userEmail })
        console.log("Existing ----*****::: ", user);
        if (!user) {
            return res.status(400).render('login', { error: 'user not found', userEmail })
        }

        const isMatch = await bcrypt.compare(userPassword, user.password);

        if (!isMatch) {
            return res.status(400).render('login', { error: 'Incorrect password', userEmail })
        }

        const token = jwt.sign({id: user._id.toString()}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        console.log("Token is ::::::>>>>>", token)

        // Cookie set
        res.cookie("token", token);  //set cookie

        return res.redirect('/')
    } catch (err) {
        console.error('loginUser error:', err);
        return res.status(500).render('login', { error: 'Server error', userEmail : '' })
    }
}

const logOutController = async (req, res) => {
    console.log("logout page -----///////");
    res.clearCookie('token');
    res.redirect('login')
}

module.exports = { signUpController, signUpUser, loginController, loginUser, logOutController }