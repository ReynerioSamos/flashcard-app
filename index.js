//filename: index.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js';
import {
    loggingMiddleware,
    redirectingMiddleware,
    errorHandlingMiddleware
} from './middleware/middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
app.use(loggingMiddleware);

// View engine
app.set("view engine", "ejs");
app.set("views", [
    path.join(process.cwd(), 'views'),
    path.join(process.cwd(), 'views/errorpages')
]);

// Routes
app.use('/', categoryRoutes);
app.use('/', flashcardRoutes);

// error handling middleware
app.use ((err, req, res, next) =>{
    errorHandlingMiddleware(err, req, res, next);
});


connectToDatabase();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});