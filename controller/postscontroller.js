const posts = require('../models/posts');
const moment = require('moment');

module.exports.add_posts = (req,res) => {
    try{
        return res.render('add_posts');
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}

module.exports.insertposts = async (req,res ) => {
    try{
        var img = '';
        if(req.file){
            img = img = posts.imgpath + '/' + req.file.filename;
        }
        else {
            req.flash('error', "No image selected");
            return res.redirect('back')
        }
        req.body.postsimage = img;
        req.body.username = req.user.name;
        req.body.create_date = moment().format('lll');
        req.body.status = true;
        let data = await posts.create(req.body);
        if(data){
            req.flash('success',"data inserted successfully");
            return res.redirect('back');
        }
        else{
            req.flash('error',"data not inserted");
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}

module.exports.view_posts = async (req,res) => {
    try{
        var search = '';
        if(req.query.search){
            search = req.query.search;
        }
        let data = await posts.find({
            $or: [
                {title: {$regex: search,$options: "i"}},
                {category: {$regex: search,$options: "i"}},
                {username: {$regex: search,$options: "i"}}
            ]
        })
        if(data){
            return res.render('view_posts',{
                data
            })
        }
        else{
            req.flash('error',"data not found");
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}