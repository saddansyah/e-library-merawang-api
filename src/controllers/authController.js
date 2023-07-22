const User = require('../models/usersModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator')

const { successResponseBuilder, httpUnauthorized, httpBadRequest } = require('../helpers/responseBuilder');

const createToken = (payload) => {
    return jwt.sign({ ...payload }, process.env.SECRET, { expiresIn: '1d' })
}

exports.signup = async (req, res, next) => {
    try {
        // Destructure Body
        const { name, email, password } = req.body;

        console.log(name, email, password)

        // Validate email and password
        // signUpValidation({ name, email, password });

        // Encrypt Password
        const salt = await bcrypt.genSalt(2);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // Generate new user
        const user = await User.create({
            email: email.toLowerCase(),
            name,
            password: encryptedPassword
        })

        // Generate access token
        const accessToken = createToken({
            id: user._id, email
        });

        res.status(200).json(successResponseBuilder({
            user,
            accessToken
        }));

    }
    catch (err) {
        if (err?.code === 11000) {
            next({
                message: `User lain dengan email ${err?.keyValue?.email} sudah terdaftar.`,
                stack: err.stack,
                statusCode: 409,
            });
            return;
        }
        if (['CastError', 'ValidationError'].includes(err?.name)) {
            next({
                message: err.message,
                stack: err.stack,
                statusCode: 400,
            });
            return;
        }
        next(err);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        signInValidation(email, password);

        // Check user to database
        const user = await User.findOne({ email });

        // Validate is user exist
        if (!user) {
            throw httpBadRequest(`Email tidak valid`);
        }

        const match = await bcrypt.compare(password, user.password);

        // Validate is password correct
        if (!match) {
            throw httpUnauthorized('Kredensial invalid')
        };

        // Generate access token
        const accessToken = createToken({
            id: user._id, email
        });

        res.status(200).json(successResponseBuilder({
            user,
            accessToken
        }));

    }
    catch (err) {
        if (err?.code === 11000) {
            next({
                message: `User lain dengan email ${err?.keyValue?.email} sudah terdaftar.`,
                stack: err.stack,
                statusCode: 409,
            });
            return;
        }
        if (['CastError', 'ValidationError'].includes(err?.name)) {
            next({
                message: err.message,
                stack: err.stack,
                statusCode: 400,
            });
            return;
        }
        next(err);
    }
}

const signUpValidation = (email, name, password) => {
    if (!email || !name || !password) {
        throw httpBadRequest('Semua field harus diisi')
    }

    if (!validator.isEmail(email)) {
        throw httpBadRequest('Email tidak valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw httpBadRequest('Password tidak cukup kuat');
    }
}

const signInValidation = (email, password) => {
    if (!email || !password) {
        throw httpBadRequest('Semua field harus diisi')
    }

    if (!validator.isEmail(email)) {
        throw httpBadRequest('Email tidak valid')
    }
}