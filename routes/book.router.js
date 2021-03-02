const express = require('express');
const books = require('../controllers/books');
const { catchRejectedPromise } = require('../lib/utils');
const router = express.Router();

router.get('/books', catchRejectedPromise(books.getAllBooks));
router.get('/books/:id', catchRejectedPromise(books.getBooksById));
router.post('/books', catchRejectedPromise(books.addBook));
router.put('/books/:id', catchRejectedPromise(books.updateBook));
router.delete('/books/:id', catchRejectedPromise(books.deleteBooksById));

module.exports = router;
