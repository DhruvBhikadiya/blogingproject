const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagepath = "/uploades/posts";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postsimage: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    create_date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

const addata = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imagepath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

schema.statics.uploadimage = multer({
    storage: addata
}).single('postsimage');
schema.statics.imgpath = imagepath;

module.exports = mongoose.model('posts', schema);