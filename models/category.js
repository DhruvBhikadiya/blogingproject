const mongoose = require('mongoose');

const schema = mongoose.Schema({
    category: { 
        type: String,
        required: true 
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('category', schema);