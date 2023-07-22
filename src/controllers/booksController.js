const Books = require('../models/booksModel.js');
const axios = require('axios');
const mongoose = require('mongoose');
const { successResponseBuilder, httpNotFound, httpBadRequest } = require('../helpers/responseBuilder');

exports.getAllBooks = async (req, res, next) => {
    try {
        // const user_id = req.user.uid;
        const books = await Books
            .find({})
            // .find({ user_id })
            .sort({ createdAt: -1 })
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

        res.status(201).json(successResponseBuilder(books));
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
            throw httpNotFound(`Book with ID ${id} is not found`);
        }

        res.status(201).json(successResponseBuilder(books));
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
            throw httpNotFound(`Book with ID ${id} is not found`)
        }

        res.status(201).json(successResponseBuilder(books));
    }
    catch (err) {
        next(err);
    }

};

exports.searchGoogleBooks = async (req, res, next) => {
    try {
        if (!req.query.q) {
            throw httpNotFound('You must specify the query variables')
        }

        const query = req.query.q;
        const baseurl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.BOOKAPIKEY}`

        const json = await axios.get(baseurl, {
            headers: {
                'Content-type': 'application/json'
            }
        });

        const { data } = await json;
        res.status(200).json(successResponseBuilder(data));

    }
    catch (err) {
        next(err)
    }
}
