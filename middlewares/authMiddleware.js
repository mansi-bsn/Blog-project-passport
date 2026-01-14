const passport = require('../utils/passport');

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.error('JWT Error:', err);
            return res.redirect('/login');
        }
        
        if (!user) {
            console.log('JWT Authentication failed:', info?.message || 'No user found');
            return res.redirect('/login');
        }
        
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = { authMiddleware }
