const Articles = require('../models/articlesModel');
const ArticleCategories = require('../models/articleCategoriesModel');

const mongoose = require('mongoose');
const { successResponseBuilder, httpNotFound, httpBadRequest } = require('../helpers/responseBuilder');

exports.getAllArticles = async (req, res, next) => {
    try {
        // const user_id = req.user._id;
        const articles = await Articles
            .find({})
            // .find({ user_id })
            // .sort({ createdAt: -1 })
            .exec();

        if (!articles) {
            throw httpNotFound('Articles is empty');
        }

        res.status(200).json(successResponseBuilder(articles));
    }
    catch (err) {
        next(err);
    }
};

exports.getArticle = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw httpNotFound('Your ID is invalid');
        }

        // const user_id = req.user._id;
        const article = await Articles
            .find()
            // .find({ user_id })
            .findOne({ _id: id })
            .exec();

        if (!article) {
            throw httpNotFound(`Article with ID: ${id} is not found`);
        }

        res.status(200).json(successResponseBuilder(article));
    }
    catch (err) {
        next(err);
    }
};

exports.createArticle = async (req, res, next) => {
    try {
        if (!req.body) {
            throw httpBadRequest('All field in request body must be not empty')
        }

        const body = req.body;

        // const user_id = req.user._id;
        const article = await Articles
            .create(body);

        res.status(200).json(successResponseBuilder(article));
    }
    catch (err) {
        next(err);
    }
};

exports.getAllCategories = async (req, res, next) => {
    try {
        // const user_id = req.user._id;
        const categories = await ArticleCategories
            .find()
            // .find({ user_id })
            .sort({ createdAt: -1 })
            .exec();

        if (!categories) {
            throw httpNotFound('Article category(s) is empty');
        }

        res.status(200).json(successResponseBuilder(categories));
    }
    catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        if (!req.body) {
            throw httpBadRequest('All field in request body must be not empty')
        }

        const body = req.body;

        // const user_id = req.user._id;
        const category = await ArticleCategories
            .create(body);

        res.status(200).json(successResponseBuilder(category));
    }
    catch (err) {
        next(err);
    }
};
