import express from 'express';
import {
    addFlashcard,
    updateFlashcard,
    updateFlashcardProgress,
    deleteFlashcard,
    getFlashcard,
    searchFlashcards,
    filterFlashcards,
    sortFlashcards
} from '../controllers/flashcardController.js';
import {
    validateNewFlashcard,
    validateUpdateFlashcard,
    validateFlashcardID,
    validateFlashcardQueryParams
} from '../middleware/flashcardValidators.js';

const router = express.Router();

// Add flashcard to specific category
router.post('/:categoryId', validateNewFlashcard, addFlashcard);

// Search/filter/sort within a category
router.get('/:categoryId/search', validateFlashcardQueryParams, searchFlashcards);
router.get('/:categoryId/filter', validateFlashcardQueryParams, filterFlashcards);
router.get('/:categoryId/sort', validateFlashcardQueryParams, sortFlashcards);

// Flashcard operations within a category
router.get('/:categoryId/:flashcardId', validateFlashcardID, getFlashcard);
router.put('/:categoryId/:flashcardId', validateFlashcardID, validateUpdateFlashcard, updateFlashcard);
router.patch('/:categoryId/:flashcardId/progress', validateFlashcardID, updateFlashcardProgress);
router.delete('/:categoryId/:flashcardId', validateFlashcardID, deleteFlashcard);



export default router;