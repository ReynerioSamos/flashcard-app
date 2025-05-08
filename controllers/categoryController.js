import Category from "../models/categoryModel.js";

export const getHome = async (req, res) => {
    try {
        const categorylist = await Category.displayAllCategories();
        res.render('categories', { categorylist });
    } catch (err) {
        console.error('Error fetching categories', err);
        res.status(500).render('500');
    }
};

export const addCategory = async (req, res) => {
    try {
        const { title, desc } = req.body;
        await Category.addCategory(title, desc);
        res.redirect('/');
    } catch (err) {
        console.error('Error adding category', err);
        res.status(500).render('500');
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const categoryID = parseInt(req.params.categoryID);
        await Category.deleteCategory(categoryID);
        res.redirect('/');
    } catch (err) {
        console.error(`Error deleting category`, err);
        res.status(500).render('500');
    }
};

export const getCategory = async (req, res) => {
    try {
        const categoryId = parseInt(req.params.categoryId);
        const category = await Category.getCategory(categoryId);
        
        if (!category) {
            return res.status(404).render('404', { message: 'Category not found' });
        }

        // Get all flashcards for this category
        const flashcards = await Category.displayAllFlashcards(categoryId);
        
        res.render('category', { 
            category,
            flashcards,
            currentCategoryId: categoryId
        });
    } catch (err) {
        console.error('Error fetching category:', err);
        res.status(500).render('500');
    }
};