const express = require('express');
const authorization = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController')
const blogController = require('../controllers/blogController');
const categoryController = require('../controllers/categoryController')
const upload = require('../middlewares/multer');
const passport = require('../utils/passport');
const router = express.Router();

router.get('/', authorization.authMiddleware, blogController.homePageController);
// router.get('/',  controller.indexController)



// login routes
router.get('/login', authController.loginController);
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).render('login', { error: 'Server error', userEmail: req.body.userEmail });
        }
        
        if (!user) {
            return res.status(400).render('login', { error: info?.message || 'Login failed', userEmail: req.body.userEmail });
        }
        
        // Generate JWT token
        const jwt = require('jsonwebtoken');
        const JWT_SECRET = "mySuperSecretKey123";
        const JWT_EXPIRES_IN = "7d";
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        
        // Set cookie
        res.cookie("token", token);
        
        return res.redirect('/');
    })(req, res, next);
});

// signUp routes 
router.get('/signUp', authController.signUpController)
router.post('/signUp', authController.signUpUser)

//forget password
router.get('/forgotpassword', authController.forgotPasswordController);
router.post('/verifyuser', authController.verifyUserController);
// router.get('/otpverify', authController.otpVerifyController);
router.post('/checkotp', authController.otpVerifyController);
router.post('/resetpassword', authController.resetPasswordController);


// add blogs 
router.get('/addBlog', authorization.authMiddleware, blogController.addBlogController);
router.post('/createBlog', authorization.authMiddleware, upload.single('thumbnail'), blogController.createBlogController);
// Show all blogs (alias for /allBlogs)
router.get("/blogs", authorization.authMiddleware, blogController.allBlogsController);
router.get("/allBlogs", authorization.authMiddleware, blogController.allBlogsController);

// Edit blog page
router.get("/blogs/edit/:id", authorization.authMiddleware, blogController.editBlogController);

// Update blog
router.post("/blogs/edit/:id", authorization.authMiddleware, blogController.updateBlogController);

// Delete blog
router.post("/blogs/delete/:id", authorization.authMiddleware, blogController.deleteBlogController);

//category
router.get('/addcategory', authorization.authMiddleware, categoryController.addCategoryPageController)

// CREATE
router.post('/addcategory', authorization.authMiddleware, categoryController.addCategoryController);

// READ ALL
router.get('/categories', authorization.authMiddleware, categoryController.getAllCategoriesController);

// READ ONE
// router.get('/category/:id', authorization.authMiddleware, categoryController.getCategoryByIdController);

// UPDATE
router.get('/editcategory/:id', authorization.authMiddleware, categoryController.editCategoryController);

router.post('/updatecategory/:id', authorization.authMiddleware, categoryController.updateCategoryController);

// DELETE
router.post('/deletecategory/:id', authorization.authMiddleware, categoryController.deleteCategoryController);

// logout 
router.get('/logout', authController.logOutController);


module.exports = router;