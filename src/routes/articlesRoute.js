const express = require('express');
const controller = require('../controllers/articleController');
// const requireAuth = require('../middleware/requireAuth')

const route = express.Router();

route.get('/category', /* Authorization Middleware */ controller.getAllCategories);
route.post('/category', /* Authorization Middleware */ controller.createCategory);

route.get('/', controller.getAllArticles);
route.get('/:id', controller.getArticle);
route.post('/', /* Authorization Middleware */ controller.createArticle);

// Route error handler
route.patch('/', (req, res, next) => {
    try {
        throw new Error("PUT '/' route is not found")
    } catch (e) {
        e.statusCode = 404;
        next(e)
    }
});

route.delete('/', (req, res, next) => {
    try {
        throw new Error("DELETE '/' route is not found")
    } catch (e) {
        e.statusCode = 404;
        next(e)
    }
});

module.exports = route