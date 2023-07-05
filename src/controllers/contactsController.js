const Contacts = require('../models/contactsModel.js');
const mongoose = require('mongoose');
const { successResponseBuilder, httpNotFound, httpBadRequest } = require('../helpers/responseBuilder');

exports.getAllContacts = async (req, res, next) => {

    try {
        const user_id = req.user.uid;
        const contacts = await Contacts
            .find({})
            .find({ user_id })
            // .sort({ isPinned: -1, createdAt: -1 })
            .exec();

        if (!contacts) {
            throw httpNotFound('Contacts is empty');
        }

        res.status(200).json(successResponseBuilder(contacts));
    }
    catch (err) {
        next(err);
    }
};

exports.getContact = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw httpNotFound('Your ID is invalid');
        }

        const user_id = req.user.uid;
        const contact = await Contacts
            .find()
            .find({ user_id })
            .findOne({ _id: id })
            .exec();

        if (!contact) {
            throw httpNotFound(`Contacts with ID ${id} is not found`);
        }

        res.status(200).json(successResponseBuilder(contact));
    }
    catch (err) {
        next(err);
    }
};

exports.createContact = async (req, res, next) => {
    try {
        if (!req.body) {
            throw httpBadRequest('All field in request body must be not empty')
        }
        const body = req.body;
        const user_id = req.user.uid;

        const contacts = await Contacts
            .create(body);

        res.status(200).json(successResponseBuilder(contacts));
    }
    catch (err) {
        next(err);
    }
};

exports.updateContact = async (req, res, next) => {
    try {
        if (!req.body) {
            throw httpBadRequest('All field in request body must be not empty');
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw httpNotFound('Your ID is invalid');
        }

        const id = req.params.id;
        const body = req.body;
        const user_id = req.user.uid;

        const contacts = await Contacts
            .findOneAndUpdate({ user_id: user_id, _id: id }, { ...body }, { returnDocument: 'after' })
            .exec();

        if (!contacts) {
            throw httpNotFound(`Contact with ID ${id} is not found`);
        }

        res.status(200).json(successResponseBuilder(contacts));
    }
    catch (err) {
        next(err);
    }
};

exports.deleteContact = async (req, res, next) => {

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Your note id is not valid',
            };
        }

        const id = req.params.id;
        const contacts = await Contacts
            .findOneAndDelete({ _id: id })
            .exec();

        if (!contacts) {
            throw httpNotFound(`Contact with ID ${id} is not found`)
        }

        res.status(200).json(successResponseBuilder(contacts));
    }
    catch (err) {
        next(err);
    }

};
