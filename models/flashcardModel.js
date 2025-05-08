// Filename: models/flashcardModel.js

export class Flashcard {
    
    constructor(fcid, catid, type, progress, front, back, created_at, updated_at) {
        this.fcid = fcid;
        this.catid = catid;
        this.type = type;
        this.progress = progress;
        this.front = front;
        this.back = back;
        this.created_at = created_at;
        this.updated_at = updated_at;


        const validStatus = ['Not Learned', 'Partially Learned', 'Learned'];
        this.progress = validStatus.includes(progress) ? progress : 'Not Learned';
    }
    
    setStatus(newProgress) {
        const validStatus = ['Not Learned', 'Partially Learned', 'Learned'];
        if (validStatus.includes(newProgress)) {
            this.progress = newProgress;
        } else {
            throw new Error(`Invalid Status: ${newStatus}`);
        }
    }

    displayFlashcard() {
        console.log(`Flashcard id : ${this.fcid}`);
        console.log(`Flashcard Category id : ${this.catid}`);
        console.log(`Flashcard type : ${this.type}`);
        console.log(`Flashcard progress : ${this.progress}`);
        console.log(`Flashcard front: ${this.front}`);
        console.log(`Flashcard back: ${this.back}`);
        console.log(`Flashcard created_at: ${this.created_at}`);
        console.log(`Flashcard updated_at: ${this.updated_at}`);
    }

    updateFlashcard(newType, newProgress, newFront, newBack) {
        this.type = newType;
        this.progress = newProgress;
        this.front = newFront;
        this.back = newBack;
    }



}

export default Flashcard;