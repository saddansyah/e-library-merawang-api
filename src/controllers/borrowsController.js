const Borrows = require('../models/borrowsModel.js');
const mongoose = require('mongoose');
const { successResponseBuilder, httpNotFound, httpBadRequest } = require('../helpers/responseBuilder');

exports.getAllBorrows = async (req, res, next) => {
    try {
        // const user_id = req.user.uid;
        const borrows = await Borrows
            .find({})
            .populate('books')
            // .find({ user_id })
            .sort({ createdAt: -1 })
            .exec();

        if (!borrows) {
            throw httpNotFound('There is no such borrowed book(s) exist');
        }

        res.status(200).json(successResponseBuilder(borrows));
    }
    catch (err) {
        next(err);
    }
};

exports.getBorrow = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw httpNotFound('Your ID is invalid');
        }

        // const user_id = req.user.uid;
        const borrow = await Borrows
            // .find({ user_id })
            .findOne({ _id: id })
            .populate('books')
            .exec();

        if (!borrow) {
            throw httpNotFound(`Book with ID ${id} is not found`);
        }

        res.status(200).json(successResponseBuilder(borrow));
    }
    catch (err) {
        next(err);
    }
};

exports.createBorrow = async (req, res, next) => {
    try {
        if (!req.body) {
            throw httpBadRequest('All field in request body must be not empty')
        }
        const body = req.body;
        // const user_id = req.user.uid;

        const borrows = await Borrows
            .create(body)

        const borrow = await Borrows
            // .find({ user_id })
            .findOne({ _id: borrows._id })
            .populate('books')
            .exec();

        res.status(200).json(successResponseBuilder(borrow));
    }
    catch (err) {
        next(err);
    }
};

exports.updateBorrow = async (req, res, next) => {
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

        const borrows = await Borrows
            .findOneAndUpdate({ /*user_id: user_id,*/ _id: id }, { ...body }, { returnDocument: 'after' })
            .populate('books')
            .exec();

        if (!borrows) {
            throw httpNotFound(`Book with ID ${id} is not found`);
        }

        res.status(200).json(successResponseBuilder(borrows));
    }
    catch (err) {
        next(err);
    }
};

exports.deleteBorrow = async (req, res, next) => {

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw httpNotFound('Your ID is invalid');
        }

        const id = req.params.id;
        const book = await Borrows
            .findOneAndDelete({ _id: id })
            .populate('books')
            .exec();

        if (!book) {
            throw httpNotFound(`Book with ID ${id} is not found`)
        }

        res.status(200).json(successResponseBuilder(book));
    }
    catch (err) {
        next(err);
    }

};

