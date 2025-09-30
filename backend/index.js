/**
 * Name: Valeria Heredia
 * Date: September 29, 2025
 * Course: IT302 – 451
 * Assignment: Phase 2 Read MongoDB Data using Node.js Assignment
 * Email: vvh@njit.edu
 */
import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import BooksDAO from './dao/booksDAO.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5000;

MongoClient.connect(
    process.env.MONGODB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
    }
)
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await BooksDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    });
