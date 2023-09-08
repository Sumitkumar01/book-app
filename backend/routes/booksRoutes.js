import express from 'express';
import { Book } from '../models/bookmodel.js';


const router = express.Router();

// Route for post books to data base;

router.post('/', async (reqs, resp) => {

    const { title, author, publishYear } = reqs.body;

    try {
        if (!title ||
            !author ||
            !publishYear) {
            return resp.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: title,
            author: author,
            publishYear: publishYear
        }
        const book = await Book.create(newBook);
        return resp.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });
    }
});

// Route for get all books from data base;

router.get('/', async (reqs, resp) => {
    try {
        const books = await Book.find({});
        return resp.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });

    }
});

// Route for get one books from data base;

router.get('/:id', async (reqs, resp) => {
    try {

        const { id } = reqs.params;

        const book = await Book.findById(id);
        return resp.status(200).json({ book });

    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });

    }
})

// Route for put to update books to data base;

router.put('/:id', async (reqs, resp) => {

    const { title, author, publishYear } = reqs.body;

    try {
        if (!title ||
            !author ||
            !publishYear) {
            return resp.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = reqs.params;

        const result = await Book.findByIdAndUpdate(id, reqs.body);

        if (!result) {
            return resp.status(400).send({
                message: 'Book not found',
            });
        }

        return resp.status(200).send({ message: 'Book updated successfully' })

    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });

    }
});

// Route for delete one books from data base;

router.delete('/:id', async (reqs, resp) => {

    const { id } = reqs.params;

    try {

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return resp.status(400).send({
                message: 'Book not found',
            });
        }

        return resp.status(200).send({ message: 'Book deleted successfully' })

    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });

    }
});

export default router;