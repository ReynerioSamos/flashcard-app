// Filename: controllers/flashcardController.js
import Flashcard from "../models/flashcardModel.js";
import { Flashcard } from "../models/flashcardModel.js";

export const addFlashcard = async (req, res) => {
    try {
        const {type, progress, front, back } =req.body;
        await Flashcard.addFlashcard(type, progress, front, back);
        //Here it should redirect to the current category the card is being added to and not home
        res.redirect('/');
    } catch (err) {
        console.error('Error adding flashcard: ', err);
        res.status(500).render('500');
    }
};

export const updateFlashcard = async (req, res) => {
    
};

export const deleteFlashcard = async (req, res) => {
    try {
        const flashID = parseInt(req.params.id);
        await Flashcard.deleteFlashcard(flashID);
        //Here it should redirect to the current category the card is being added to and not home
        res.redirect('/')
    } catch (err) {
        console.error('Error deleting Flashcard: ', err);
        res.status(500).render('500')
    }
};

