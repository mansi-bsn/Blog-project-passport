const JWT_SECRET = "mySuperSecretKey123";
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.cookies?.token;
        if (!token) {
            return res.redirect('/login');
        }

        console.log("token---->>>>", token);
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.redirect('/login');
        }

        req.token = token;  // optionally pass user to next route
        next();
    } catch(err){
        console.log("JWT Error:", err.name);

        if (err.name === "TokenExpiredError") {
            console.log("Token expired");
            return res.redirect('/login');
        }

        if (err.name === "JsonWebTokenError") {
            console.log("Invalid token");
            return res.redirect('/login');
        }
        return res.redirect('/login');
    }
    // res.redirect('/')
}

// const loginMiddleware = async (req, res) => {

// }

module.exports = { authMiddleware }