// Filename: middleware/flashcardValidators.js
export const validateNewFlashcard = (req, res, next) => {
    const { type, progress, front, back } = req.body;
    const errors = []

    // Type Validation
    // Can be optional but must be under 50 char
    if (type && type.length > 50) {
        const errormsg= 'Type must be less than 50 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Progress Validation
    // Validation must be: 'Not Learned', 'Partially Learned' or 'Learned
    if (progress && !['Not Learned', 'Partially Learned', 'Learned'].includes(progress)) {
        const errormsg = 'Progress must be Not Learned, Partially Learned or Learned.';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Front Validation
    // Mandatory and must be b/w 3-500 characters
    if (!front || front.trim().length === 0) {
        const errormsg = 'Front is required';
        errors.push(errormsg);
        console.log(errormsg);
    } else if (front.length < 3) {
        const errormsg = 'Front must be more than 3 characters';
        errors.push(errormsg);
        console.log(errormsg);
    } else if (front.length > 500) {
        const errormsg = 'Front must be less than 500 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Back Validation
    // Optional and must be less than 500 characters

    if (back && back.length > 500) {
        const errormsg = 'Back must be less than 500 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();
};

export const validateUpdateFlashcard = (req, res, next) => {
    const { type, progress, front, back } = req.body;
    const flashid = req.params.id;
    const errors = [];

    // flashcard id validation
    // Must be an integer
    if (isNaN(parseInt(flashid))) {
        const errormsg = 'Flashcard ID must be an integer';
        errors.push(errormsg);
        console.log(errormsg);
    }

        // Type Validation
    // Can be optional but must be under 50 char
    if (type && type.length > 50) {
        const errormsg= 'Type must be less than 50 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Progress Validation
    // Validation must be: 'Not Learned', 'Partially Learned' or 'Learned
    if (progress && !['Not Learned', 'Partially Learned', 'Learned'].includes(progress)) {
        const errormsg = 'Progress must be Not Learned, Partially Learned or Learned.';
        errors.push(errormsg);
        console.log(errormsg);
    }

        // Front Validation
    // Mandatory and must be b/w 3-500 characters
    if (title !== undefined) {
        const errormsg = 'Front must not be empty';
        errors.push(errormsg);
        console.log(errormsg);
    } else if (front.length < 3) {
        const errormsg = 'Front must be more than 3 characters';
        errors.push(errormsg);
        console.log(errormsg);
    } else if (front.length > 500) {
        const errormsg = 'Front must be less than 500 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Back Validation
    // Optional and must be less than 500 characters

    if (back && back.length > 500) {
        const errormsg = 'Back must be less than 500 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();    
};

export const validateFlashcardID = (req, res, next) => {
    const flashid = req.params.id;

    if(isNaN(parseInt(flashid))) {
        return res.status(400).json({
            success: false,
            errors: ['Flashcard ID must be an integer']
        });
    }
    next();
};

export const validateFlashcardQueryParams = (req, res, next) => {
    const {q, progress, criteria, order } = req.query;
    const errors=[];

    // Validate search string if provided
    if (q !== undefined && typeof q !== 'string') {
        const errormsg = 'Search query must be a string';
        errors.push(errormsg);
        console.long(errormsg);
    }

    // Validate progress is provided
    if (progress && !['not learned', 'partially learned', 'learned'].invludes(progress)) {
        const errormsg = 'Progress must be not learned, partiall learned or learned.';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Validate sort criteria if provided
    if (criteria && !['progress', 'type'].includes(criteria)) {
        const errormsg = 'Sort criteria must be progress or type';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Validate sort order if provided
    if (order && !['asc', 'desc'].includes(order)) {
        const errormsg = 'Sort order must be ascending or descending';
        errors.push(errormsg);
        console.log(errormsg);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }
    next();
};

export default {
    validateNewFlashcard,
    validateUpdateFlashcard,
    validateFlashcardID,
    validateFlashcardQueryParams
};