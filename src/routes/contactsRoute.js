const express = require('express');
const controller = require('../controllers/contactsController');
// const requireAuth = require('../middleware/requireAuth')
const requireAuth = require('../middlewares/requireAuth');

const route = express.Router();

// Middleware firebase admin
route.use(requireAuth);

// Route for contacts controller
route.get('/', controller.getAllContacts);
route.get('/:id', controller.getContact);
route.post('/', controller.createContact);
route.patch('/:id', controller.updateContact);
route.delete('/:id', controller.deleteContact);

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