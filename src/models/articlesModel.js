const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: Array
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('articles', articlesSchema);