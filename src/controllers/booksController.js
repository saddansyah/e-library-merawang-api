const Books = require('../models/booksModel.js');
const mongoose = require('mongoose');
const { successResponseBuilder, httpNotFound, httpBadRequest } = require('../helpers/responseBuilder');

exports.getAllBooks = async (req, res, next) => {
    try {
        // const user_id = req.user.uid;
        const books = await Books
            .find({})
            // .find({ user_id })
            .sort({ isPinned: -1, createdAt: -1 })
            .exec();

        if (!books) {
            throw httpNotFound('There is no such book(s) exist');
        }

        res.status(200).json(successResponseBuilder(books));
    }
    catch (err) {
        next(err);
    }
};

exports.getBook = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw httpNotFound('Your ID is invalid');
        }

        // const user_id = req.user.uid;
        const book = await Books
            .find()
            // .find({ user_id })
            .findOne({ _id: id })
            .exec();

        if (!book) {
            throw httpNotFound(`Book with ID ${id} is not found`);
        }

        res.status(200).json(successResponseBuilder(book));
    }
    catch (err) {
        next(err);
    }
};

exports.createBook = async (req, res, next) => {
    try {
        if (!req.body) {
            throw httpBadRequest('All field in request body must be not empty')
        }
        const body = req.body;
        // const user_id = req.user.uid;

        const books = await Books
            .create(body);

        res.status(200).json(successResponseBuilder(books));
    }
    catch (err) {
        next(err);
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        if (!req.body) {
            throw httpBadRequest('All field in request body must be not empty');
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw httpNotFound('Your ID is invalid');
        }

        const id = req.params.id;
        const body = req.body;
        // const user_id = req.user.uid;

        const books = await Books
            .findOneAndUpdate({ /*user_id: user_id,*/ _id: id }, { ...body }, { returnDocument: 'after' })
            .exec();

        if (!books) {
            throw httpNotFound(`Contact with ID ${id} is not found`);
        }

        res.status(200).json(successResponseBuilder(books));
    }
    catch (err) {
        next(err);
    }
};

exports.deleteBook = async (req, res, next) => {

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw httpNotFound('Your ID is invalid');
        }

        const id = req.params.id;
        const books = await Books
            .findOneAndDelete({ _id: id })
            .exec();

        if (!books) {
            throw httpNotFound(`Contact with ID ${id} is not found`)
        }

        res.status(200).json(successResponseBuilder(books));
    }
    catch (err) {
        next(err);
    }

};
