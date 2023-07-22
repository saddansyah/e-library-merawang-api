const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const { httpUnauthorized, httpBadRequest } = require('../helpers/responseBuilder.js');

const TOKEN_SECRET = process.env.SECRET;

exports.authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json(httpUnauthorized('Kamu tidak terautentikasi untuk mengakses layanan ini'));
        }

        const accessToken = authorization.split(" ")[1];

        const { id } = jwt.verify(accessToken, TOKEN_SECRET);
        req.user = await User.findOne({ _id: id }).select('_id');

        next();
    }
    catch (error) {
        res.status(401).json(httpUnauthorized('Token tidak valid'));
    }
}