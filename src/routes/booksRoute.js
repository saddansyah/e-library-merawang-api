const express = require('express');
const controller = require('../controllers/booksController');
// const requireAuth = require('../middlewares/requireAuth');

const route = express.Router();

// Middleware firebase admin
// route.use(requireAuth);

// Route for contacts controller
route.get('/search', controller.searchGoogleBooks);
route.get('/', controller.getAllBooks);
route.get('/:id', controller.getBook);
route.post('/', controller.createBook);
route.patch('/:id', controller.updateBook);
route.delete('/:id', controller.deleteBook);

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