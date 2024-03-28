const subcategory = require('../models/subcategory');
const category = require('../models/category');

const moment = require('moment');

module.exports.add_subcategory = async (req,res) => {
    try{
        let cdata = await category.find();
        return res.render('add_subcat',{
            cdata
        });
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
};

module.exports.subcategoryinsert = async (req,res) => {
    try{
        var img = '';
        if(req.file){
            img = subcategory.imgpath + "/" + req.file.filename;
        }
        else{
            req.flash('error',"image not selected");
            return res.redirect('back');
        }
        if(req.body){
            req.body.categoryimage = img;
            req.body.status = true;
            req.body.create_date = moment().format('LLL');
            let subcatdata = await subcategory.create(req.body);
            if(subcatdata){
                req.flash('success',"data inserted");
                return res.redirect('back');
            }
            else{
                req.flash('error',"data not inserted");
                return res.redirect('back');
            }
        }
        else{
            req.flash('error',"please fill the form");
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
};

module.exports.view_subcategory = async (req,res) => {
    try{
        let subcatdata = await subcategory.find({}).populate('categoryId').exec();
        if(subcatdata){
            return res.render('view_subcat',{
                data: subcatdata
            });
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
};