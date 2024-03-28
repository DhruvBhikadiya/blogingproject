const offer = require('../models/offer');

const fs = require('fs');

// SHOW ADD offer PAGE
module.exports.add = async (req, res) => {
    try {
        return res.render('add_offer');
    }
    catch (e) {
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

// INSERT offer DATA
module.exports.insertoffer = async (req, res) => {
    try {
        req.body.status = true;
        let data = await offer.create(req.body);
        if(data){
            req.flash('success',"offer data is inserted");
            return res.redirect('back');
        }
        else{
            req.flash('error',"offer data is not inserted");
            return res.redirect('back');
        }
    }
    catch (e) {
        console.log(e);
        req.flash('error', 'Something Went Wrong!');
        return res.redirect('back');
    }
}

// VIEW offer PAGE
module.exports.view_offer = async (req,res) => {
    try{
        var search = '';
        if(req.query.search){
            search = req.query.search;
        }
        let offerdata = await offer.find({
            title: {$regex: search,$options: "i"}
        });
        if(offerdata){
            return res.render('view_offer',{
                offerdata
            })
        }
        else{
            req.flash('error',"data not found");
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
};

// SHOW UPDATE PAGE
module.exports.adminupdate = async (req,res) => {
    try{
        let single = await offer.findById(req.params.id);
        if(single){
            return res.render('update_offer',{
                single
            })
        }
        else{
            req.flash('error','data is not found');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error','something went wrong');
        return res.redirect('back');
    }
}

module.exports.edit = async (req,res) => {
    try{
        let single = await offer.findById(req.params.id);
        if(single){
            let udata = await admin.findByIdAndUpdate(req.params.id, req.body);
            if(udata){
                req.flash('success',"data updated");
                return res.redirect('/admin/view');
            }
            else{
                req.flash('error',"data is not updated");
                return res.redirect('back');
            }
        }
        else{
            req.flash('error',"data is not found");
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error','something went wrong');
        return res.redirect('back');
    }
}
// UPDATE END

// SOFT DELETE START
module.exports.deactive = async (req,res) => {
    try{
        let offerdata = await offer.findByIdAndUpdate(req.params.id, {status: false});
        if(offerdata){
            req.flash('success', 'Data is Deactivated');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Somthing went wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.active = async (req,res) => {
    try{
        let offerdata = await offer.findByIdAndUpdate(req.params.id, {status: true});
        if(offerdata){
            req.flash('success', 'Data is Activated');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Somthing went wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}
// SOFT DELETE END