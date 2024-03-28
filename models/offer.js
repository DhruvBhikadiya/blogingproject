const mongoose = require('mongoose');

const schema = mongoose.Schema({
    icon: { 
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('offer', schema);