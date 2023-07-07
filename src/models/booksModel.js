const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Untitled"
    },
    author: {
        type: Array,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    publisher: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    subjects: {
        type: Array,
        required: true
    },
    ddc: {
        type: String,
        required: true
    },
    lcc: {
        type: String,
        required: true
    },
    callNumber: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: "-"
    },
    isPinned: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('books', booksSchema);