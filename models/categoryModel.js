// Filename: models/categoryModel.js
import { query } from "../config/db.js"
import { Flashcard } from "./flashcardModel.js";

export class Category {
    constructor(cid, title, desc, cardCount, created_at, updated_at) {
        this.cid = cid;
        this.title = title;
        this.desc = desc,
        this.cardCount = cardCount;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async addFlashcard(type, progress, front, back) {
        const validProgress = ['Learned', 'Partially Learned', 'Not Learned'];
        const cardProgress = validProgress.includes(progress) ? progress : 'Not Learned';

        const result = await query(
            `INSERT INTO flashcards (type, progress, front, back)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [type, progress, front, back]
        );

        return new Flashcard(
            result.rows[0].fcid,
            result.rows[0].catid,
            result.rows[0].type,
            result.rows[0].progress,
            result.rows[0].front,
            result.rows[0].back,
            result.rows[0].created_at,
            result.rows[0].updated_at
        );
    }

    async getFlashcard(flashid) {
        const result = await query(
            `SELECT * FROM flashcards WHERE fcid = $1`,
            [flashid]
        );

        if (result.rows.length === 0) return null;

        const flashcardData = result.rows[0];
        return new Flashcard(
            flashcardData.fcid,
            flashcardData.catid,
            flashcardData.type,
            flashcardData.progress,
            flashcardData.front,
            flashcardData.back,
            flashcardData.created_at,
            flashcardData.updated_at
        );
    }

    async deleteFlashcard(flashid) {
        await query(
            `DELETE FROM flashcards WHERE fcid = $1`
            [flashid]
        );
    }

    async displayAllFlashcards() {
        const result = await query(`SELECT * FROM flashcards`);
        return result.rows.map(row => new Flashcard (
            row.fcid,
            row.catid,
            row.type,
            row.progress,
            row.front,
            row.back,
            row.created_at,
            row.updated_at
        ));
    }

    async setProgress(flashid,newProgress) {
        const result = await query(
            `UPDATE flashcards
            SET progress = $2,
                updated_at = NOW()
            WHERE fcid = $1
            RETURNING *`,
            [flashid, newProgress]
        );

        if (result.rows.length === 0) return null;

        const flashcardData = result.rows[0];
        return new Flashcard(
            flashcardData.fcid,
            flashcardData.catid,
            flashcardData.type,
            flashcardData.progress,
            flashcardData.front,
            flashcardData.back,
            flashcardData.created_at,
            flashcardData.updated_at
        );
    }

    async searchFlashcards(searchString) {
        const lowercaseSearchString = `%${searchString.toLowerCase().trim()}%`;

        const result = await query(
            `SELECT * FROM flashcards
            WHERE LOWER(type) LIKE $1
                OR LOWER(front) LIKE $1
                OR LOWER(back) LIKE $1`,
            [lowercaseSearchString]
        );

        return result.rows.map(row => new Flashcard(
            row.fcid,
            row.catid,
            row.type,
            row.progress,
            row.front,
            row.back,
            row.created_at,
            row.updated_at
        ));
    }

    async filterFlashcards(filterprogress) {
        let queryText = 'SELECT * FROM flashcards';
        let params = [];

        if (filterprogress === 'not learned') {
            queryText += 'WHERE progress = not learned'
        } else if (filterprogress === 'partially learned') {
            queryText += 'WHERE progress = partiall learned'
        } else if (filterprogress === 'learned') {
            queryText += 'WHERE progress = learned'
        }

        const result = await query(queryText, params);
        return result.rows.map(row => new Flashcard(
            row.fcid,
            row.catid,
            row.type,
            row.progress,
            row.front,
            row.back,
            row.created_at,
            row.updated_at
        ));
    }

    async sortFlashcards(criteria = 'progress', order = 'desc') {
        let queryText = 'SELECT * FROM tasks';

        if (criteria == 'progress') {
            queryText +=
            ` ORDER BY
                CASE progress
                    WHEN 'not learned' THEN 1
                    WHEN 'partially learned' THEN 2
                    WHEN 'learned' THEN 3
                END ${order === 'desc' ? 'ASC' : 'DESC'}`;
        } else if (criteria === 'type') {
            queryText +=
            `ORDER BY type ${order === 'desc' ? 'DESC' : 'ASC'}`;
        }

        const result= await query(queryText);
        return result.rows.map(row => new Flashcard(
            row.fcid,
            row.catid,
            row.type,
            row.progress,
            row.front,
            row.back,
            row.created_at,
            row.updated_at
        ));
    }

    displayCategory() {
        console.log(`Category ID: ${this.cid}`);
        console.log(`Category title: ${this.title}`);
        console.log(`Category desc: ${this.desc}`);
    }

    updateCategory(newTitle, newDesc) {
        this.title = newTitle;
        this.desc = newDesc;
    }

    async addCatergory(title, desc) {
        const result = await query(
            `INSERT INTO category (title, desc)
             VALUES ($1, $2)
             RETURNING *`,
             [title, desc]
        );

        return new Category(
            result.rows[0].cid,
            result.rows[0].title,
            result.rows[0].desc,
            result.rows[0].cardCount,
            result.rows[0].created_at,
            result.rows[0].updated_at
        );
    }

    async getCategory(catid) {
        const result = await query(
            `SELECT * FROM category WHERE cid = $1`,
            [catid]
        );


        if (result.rows.length === 0) return null;

        const categoryData = result.rows[0];

        return new Category(
            categoryData.cid,
            categoryData.title,
            categoryData.desc,
            categoryData.cardCount,
            categoryData.created_at,
            categoryData.updated_at
        );
    }

    async deleteCategory(catid) {
        await query (
            `DELETE FROM category WHERE id = $1`,
            [catid]
        );
    }

    async displayAllCategories() {
        const result = await query ('SELECT * FROM category');
        return result.rows.map(row => new Category (
            row.cid,
            row.title,
            row.desc,
            row.cardCount,
            row.created_at,
            row.updated_at
        ));
    }

}

export default Category;