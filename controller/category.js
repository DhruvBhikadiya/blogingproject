const category = require('../models/category');

module.exports.add_category = async (req,res) => {
    try{
        return res.render('add_category');
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
};

module.exports.categoryinsert = async (req,res) => {
    try{
        req.body.status = true;
        let categorydata = await category.create(req.body);
        if(categorydata){
            req.flash('success',"category created");
            return res.redirect('back');
        }
        else{
            req.flash('error',"category not created");
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
};

module.exports.view_category = async (req,res) => {
    try{
        let categorydata = await category.find();
        if(categorydata){
            return res.render('view_category',{
                categorydata
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