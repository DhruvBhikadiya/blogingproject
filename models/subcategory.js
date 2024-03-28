const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/uploades/subcategory';

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    description: {    
        type: String,
        required: true
    },
    categoryimage: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    create_date: {
        type: String,
        required: true
    }
})

const imgdata = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname, '..', imgpath));
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now());
    }
})

Schema.statics.uploadimage = multer({storage: imgdata}).single('categoryimage');
Schema.statics.imgpath = imgpath;

module.exports = mongoose.model('subcategory' ,Schema);