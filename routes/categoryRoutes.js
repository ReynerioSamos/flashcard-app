import express from 'express';
import {
    getHome,
    addCategory,
    deleteCategory,
    getCategory
} from '../controllers/categoryController.js';
import {
    validateNewCategory,
    validateUpdateCategory,
    validateCategoryID
} from '../middleware/categoryValidators.js';

const router = express.Router();

// Home - shows all categories
router.get('/', getHome);

// Add new category
router.post('/', validateNewCategory, addCategory);

// Specific category operations
router.get('/:categoryId', validateCategoryID, getCategory);
router.delete('/:categoryId', validateCategoryID, deleteCategory);

export default router;