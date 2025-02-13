const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/uploades/comment';

const commentchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    email: {    
        type: 'string',
        required: true
    },
    message: {
        type: 'string',
        required: true
    },
    commentimage: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    create_date: {
        type: 'string',
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

commentchema.statics.uploadimage = multer({storage: imgdata}).single('commentimage');
commentchema.statics.imgpath = imgpath;

const comment = mongoose.model('comments' ,commentchema);

module.exports = comment;