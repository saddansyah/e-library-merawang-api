const auth = require("../config/firebase-config.js");
const { httpUnauthorized, httpBadRequest } = require('../helpers/responseBuilder');

const requireAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw httpUnauthorized('Auth token is required');
        }

        const token = req.headers.authorization.split(" ")[1];
        
        const decodeValue = await auth.verifyIdToken(token);
        if (decodeValue) {
            // console.log(decodeValue)
            req.user = decodeValue;
            return next();
        }
    } catch (error) {
        next(error)
    }
};

module.exports = requireAuth;