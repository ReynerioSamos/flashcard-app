//filename: index.js

import express from 'epxress';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

import { connectToDatabase } from './config/db.js';

// Middleware goes here
import {

} from './middleware/middleware.js';

// Routes import

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", [
    path.join(process.cwd(), 'views'),
    path,join(process.cwd(), 'views/errorpages')
]);

// Home page route here

// error handling middleware call


connectToDatabase();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
Z