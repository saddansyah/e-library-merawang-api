const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Untitled"
    },
    authors: {
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
        required: false,
        default: 'regular'
    },
    ddc: {
        type: String,
        required: true
    },
    lcc: {
        type: String,
        required: true,
        default: '000'
    },
    callNumber: {
        type: String,
        required: false,
        default: '081393789949'
    },
    pageCount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "-"
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    imageUrl: {
        type: String,
        required: false,
        default: 'https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg'
    }
}, { timestamps: true });

module.exports = mongoose.model('books', booksSchema);