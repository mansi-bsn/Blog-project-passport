const express = require('express');
const authorization = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController')
const blogController = require('../controllers/blogController');
const upload = require('../middlewares/multer');
const router = express.Router();

router.get('/', authorization.authMiddleware, blogController.homePageController);
// router.get('/',  controller.indexController)

// login routes
router.get('/login', authController.loginController);
router.post('/login', authController.loginUser);

// signUp routes 
router.get('/signUp', authController.signUpController)
router.post('/signUp', authController.signUpUser)

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

// logout 
router.get('/logout', authController.logOutController);


module.exports = router;