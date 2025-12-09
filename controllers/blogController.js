const Blog = require('../models/Blog');

const slugify = (text = "") => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const homePageController = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.render('index', { blogs });
  } catch (err) {
    console.error("Home page load error:", err);
    res.render('index', { blogs: [] });
  }
};

const addBlogController = (req, res) => {
  res.render('addBlog');
};

const createBlogController = async (req, res) => {
    try {
        const { title, slug, shortDescription, content, category, tags, status } = req.body;

        if (!title) return res.status(400).send("Title is required");
        if (!req.file) return res.status(400).send("Thumbnail is required");

        let finalShort = shortDescription;

        // auto-generate if missing
        if (!finalShort && content) {
            const plain = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
            finalShort = plain.substring(0, 160) + "...";
        }

        const blog = new Blog({
            title,
            slug: slug || slugify(title),
            shortDescription: finalShort,
            content,
            category,
            status: status || "draft",
            thumbnail: req.file.filename,
            tags: tags ? tags.split(",").map(t => t.trim()) : []
        });

        await blog.save();

        res.redirect('/');

    } catch (error) {
        console.error("Create Blog Error:", error);
        res.status(500).send("Internal server error");
    }
};

const allBlogsController = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("allBlogs", { blogs });
}

const editBlogController = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render("editBlog", { blog });
}

const updateBlogController = async (req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/blogs");
    } catch (err) {
        console.log("Edit error:", err);
        res.send("Error updating blog");
    }
}

const deleteBlogController = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect("/blogs");
    } catch (err) {
        console.log("Delete error:", err);
        res.send("Error deleting blog");
    }
}

module.exports = { homePageController, addBlogController, createBlogController, allBlogsController, editBlogController, updateBlogController, deleteBlogController };
