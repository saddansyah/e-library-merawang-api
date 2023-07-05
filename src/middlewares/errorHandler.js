const { errorResponseBuilder } = require('../helpers/responseBuilder');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json(errorResponseBuilder(err));
    
    return;
};

module.exports = errorHandler;