const express = require('express');
const controller = require('../controllers/borrowsController');
// const requireAuth = require('../middlewares/requireAuth');

const route = express.Router();

// Middleware firebase admin
// route.use(requireAuth);

// Route for contacts controller
route.get('/', controller.getAllBorrows);
route.get('/:id', controller.getBorrow);
route.post('/', controller.createBorrow);
route.patch('/:id', controller.updateBorrow);
route.delete('/:id', controller.deleteBorrow);

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