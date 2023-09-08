import express from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors';

const app = express();

//  middleware for parsing request body
app.use(express.json());

// middleware for handling cors policy

app.use(cors({
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.use('/books', booksRoutes);


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

app.get('/', (req, res) => {
    res.send("hello")
});







mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log('app connected to database')
    })
    .catch((err) => {
        console.log(err)
    });