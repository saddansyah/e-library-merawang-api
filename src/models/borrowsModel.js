const mongoose = require('mongoose');

const borrowsSchema = new mongoose.Schema({
    borrowedBy:
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    borrowedDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    books: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'books'
    }
}, { timestamps: true });

module.exports = mongoose.model('borrows', borrowsSchema);