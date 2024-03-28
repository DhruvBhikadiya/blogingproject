const mongoose = require('mongoose');

const schema = mongoose.Schema({
    message: { 
        type: String,
        required: true 
    },
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('testimonial', schema);