import Flashcard from "../models/flashcardModel.js";
import Category from "../models/categoryModel.js";

export const addFlashcard = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { type, progress, front, back } = req.body;
        
        await Category.addFlashcard(categoryId, type, progress, front, back);
        res.redirect(`/${categoryId}`);
    } catch (err) {
        console.error('Error adding flashcard:', err);
        res.status(500).render('500');
    }
};

export const updateFlashcard = async (req, res) => {
    try {
        const { categoryId, flashcardId } = req.params;
        const { type, progress, front, back } = req.body;
        
        await Flashcard.updateFlashcard(flashcardId, type, progress, front, back);
        res.redirect(`/${categoryId}/${flashcardId}`);
    } catch (err) {
        console.error('Error updating flashcard:', err);
        res.status(500).render('500');
    }
};

export const updateFlashcardProgress = async (req, res) => {
    try {
        const { categoryId, flashcardId } = req.params;
        const { progress } = req.body;
        
        const flashcard = await Category.setProgress(flashcardId, progress);
        
        if (!flashcard) {
            return res.status(404).render('404', { message: 'Flashcard not found' });
        }

        res.redirect(`/${categoryId}/${flashcardId}`);
    } catch (err) {
        console.error('Error updating flashcard progress:', err);
        res.status(500).render('500');
    }
};

export const deleteFlashcard = async (req, res) => {
    try {
        const { categoryId, flashcardId } = req.params;
        await Flashcard.deleteFlashcard(flashcardId);
        res.redirect(`/${categoryId}`);
    } catch (err) {
        console.error('Error deleting flashcard:', err);
        res.status(500).render('500');
    }
};

export const getFlashcard = async (req, res) => {
    try {
        const { categoryId, flashcardId } = req.params;
        const flashcard = await Category.getFlashcard(flashcardId);
        
        if (!flashcard) {
            return res.status(404).render('404', { message: 'Flashcard not found' });
        }

        res.render('flashcard', { 
            flashcard,
            currentCategoryId: categoryId
        });
    } catch (err) {
        console.error('Error fetching flashcard:', err);
        res.status(500).render('500');
    }
};

export const searchFlashcards = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const searchQuery = req.query.q;
        
        const flashcards = searchQuery && searchQuery.trim() !== ''
            ? await Category.searchFlashcards(categoryId, searchQuery)
            : await Category.displayAllFlashcards(categoryId);

        res.render('category', {
            flashcards,
            searchQuery,
            currentCategoryId: categoryId
        });
    } catch (err) {
        console.error('Error searching flashcards:', err);
        res.status(500).render('500');
    }
};

export const filterFlashcards = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { progress } = req.query;
        
        const flashcards = await Category.filterFlashcards(categoryId, progress);
        res.render('category', {
            flashcards,
            currentCategoryId: categoryId,
            filterProgress: progress
        });
    } catch (err) {
        console.error('Error filtering flashcards:', err);
        res.status(500).render('500');
    }
};

export const sortFlashcards = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { criteria, order } = req.query;
        
        const flashcards = await Category.sortFlashcards(categoryId, criteria, order);
        res.render('category', {
            flashcards,
            currentCategoryId: categoryId,
            sortCriteria: criteria,
            sortOrder: order
        });
    } catch (err) {
        console.error('Error sorting flashcards:', err);
        res.status(500).render('500');
    }
};