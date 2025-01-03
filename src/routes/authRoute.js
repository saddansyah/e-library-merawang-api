const express = require('express');
const controller = require('../controllers/authController');

const route = express.Router();

// Route for contacts controller
route.post('/signup', controller.signup);
route.post('/signin', controller.signin);

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