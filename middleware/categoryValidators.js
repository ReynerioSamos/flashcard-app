//Filename: middleware/categoryValidators.js
export const validateNewCategory = (req, res, next) => {
    const {title, desc} = req.body;
    const errors = [];

    // Title cannot be empty and b/w 3-100 characters
    if (!title || title.trim().length === 0) {
        const errormsg = 'Title is required';
        errors.push(errormsg);
        console.log(errormsg);
    } else if (title.length < 3) {
        const errormsg = 'Title must be more than 3 characters';
        errors.push(errormsg);
        console.log(errormsg);
    } else if (title.length > 100) {
        const errormsg = 'Title must be less than 100 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Description is optional, but less than 500 characters
    if (desc && desc.length > 500){
        const errormsg = 'Description must be less than 500 characters';
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

export const validateUpdateCategory = (req, res, next) => {
    const { title, desc } = req.body;
    const catID = req.params.id;
    const errors = [];

    // Category ID must be integer
    if (isNaN(parseInt(catID))) {
        const errormsg = 'catID must be an integer';
        errors.push(errormsg);
        console.log(errormsg);
    }

    // Title must be non-empty and b/w 3-100 characters
    if (title !== undefined) {
        if (title.trim().length === 0) {
            const errormsg = 'Title must no be empty';
            errors.push(errormsg);
            console.log(errormsg);
        } else if (title.length < 3) {
            const errormsg = 'Title must be more than 3 characters';
            errors.push(errormsg);
            console.log(errormsg);
        } else if (title.length > 100) {
            const errormsg = 'Title must be less than 100 characters';
            errors.push(errormsg);
            console.log(errormsg);
        }
    }

    //Description Validation
    // Optional, but less than 500 characters
    if (desc && desc.length > 500) {
        const errormsg = 'Description must be less than 500 characters';
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

export const validateCategoryID = (req, res, next) => {
    const taskID = req.params.id;

    if (isNaN(parseInt(taskID))) {
        return res.status(400).json({
            success: false,
            errors: ['Category ID must be an integer']
        });
    }

    next();
};

export default {
    validateNewCategory,
    validateUpdateCategory,
    validateCategoryID
};