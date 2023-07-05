const mongoose = require('mongoose');

const articleCategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('articleCategories', articleCategoriesSchema);