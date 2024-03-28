const testi = require('../models/testimonial');

module.exports.add = (req,res) => {
    try{
        return res.render('add_testimonial');
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}

module.exports.inserttostimonial = async (req,res) => {
    try{
        if(req.body){
            req.body.name = req.user.name;
            let data = await testi.create(req.body);
            if(data){
                req.flash('success',"data inserted successfully");
                return res.redirect('back');
            }
            else{
                req.flash('error',"data not inserted");
                return res.redirect('back');
            }
        }
        else{
            req.flash('error',"data not inserted");
            return res.redirect('back')
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}

module.exports.view_testi = async (req,res) => {
    try{
        var search = '';
        if(req.query.search){
            search = req.query.search;
        }
        let data = await testi.find({
            name: {$regex: search, $options: "i"}
        });
        if(data){
            return res.render('view_testimonial',{
                data
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
}