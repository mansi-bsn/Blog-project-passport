const Category = require("../models/Category");

const addCategoryPageController = (req, res) => {
    res.render("addCategory");
}

// CREATE CATEGORY
const addCategoryController = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) return res.send("Category name is required");

        // Check duplicate
        const exists = await Category.findOne({ name });
        if (exists) return res.send("Category already exists");

        const cat = new Category({ name, description });
        await cat.save();

        res.redirect("/categories");

    } catch (err) {
        console.log("Add Category Error:", err);
        res.send("Error creating category");
    }
}

// READ ALL CATEGORIES
const getAllCategoriesController = async (req, res) => {
    const categories = await Category.find().sort({ name: 1 });
    res.render("allCategories", { categories });
}

// READ SINGLE CATEGORY BY ID
const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ data: category });
    } catch (error) {
        console.log("Get Category Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE CATEGORY
const updateCategoryController = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/categories");
    } catch (err) {
        res.send("Error updating");
    }
};

const editCategoryController = async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.render('editCategory', { category });
}

// DELETE CATEGORY
const deleteCategoryController = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.redirect("/categories");
    } catch (err) {
        res.send("Error deleting category");
    }
};


module.exports = { addCategoryPageController, addCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController, deleteCategoryController, editCategoryController }
