// Filename: controllers/categoryController.js
import Category from "../models/categoryModel.js";
import { Category } from "../models/categoryModel.js";

export const getHome = async (req, res) => {
    try {
        const categorylist = await Category.displayAllCategories();
        res.render('categories', {categorylist});
    } catch (err) {
        console.error('Error fetching categories', err);
        res.status(500).render('500');
    }
};

export const addCategory = async (req, res) => {
    try {
        const { title, desc} = req.body;
        await Category.addCategory(title, desc);
        res.redirect('/');
    } catch (err) {
        console.error('Error adding category ', err);
        res.status(500).render('500');
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const catID = parseInt(req.params.id);
        await Category.deleteCategory(catID);
        res.redirect('/');
    } catch (err) {
        console.error(`Error deleting category with catID : ${catID}`, err);
        res.status(500).render('500');
    }
};

export const getCategoryID = async (req, res) => {
    try {
        const catID = parseInt(req, params.id);
        const category = await Category.getCategoryID(catID);
        
        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.render('category', { category });
    } catch (err) {
        console.error('Error fetching category: ', err);
        res.status(500).render('500');
    }
};