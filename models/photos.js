const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagepath = "/uploades/photos";

const schema = mongoose.Schema({
    photosimage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description : {
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
}).single('photosimage');
schema.statics.imgpath = imagepath;

module.exports = mongoose.model('photos', schema);