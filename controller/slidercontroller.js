const fs = require('fs');
const path = require('path');

const slider = require('../models/slider');

// SHOW ADD SLIDER PAGE
module.exports.add = async (req, res) => {
    try {
        return res.render('add_slider');
    }
    catch (e) {
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

// INSERT SLIDER DATA
module.exports.insertslider = async (req, res) => {
    try {
        var img = '';
        if (req.file) {
            img = slider.imgpath + '/' + req.file.filename;
        }
        else {
            req.flash('error', "No image selected");
            return res.redirect('back')
        }
        req.body.sliderimage = img;
        req.body.slider = true
        let data = await slider.create(req.body);
        if(data){
            req.flash('success',"slider data is inserted");
            return res.redirect('back');
        }
        else{
            req.flash('error',"slider data is not inserted");
            return res.redirect('back');
        }
    }
    catch (e) {
        console.log(e);
        req.flash('error', 'Something Went Wrong!');
        return res.redirect('back');
    }
}

// VIEW SLIDER PAGE
module.exports.view_slider = async (req,res) => {
    try{
        var search = '';
        if(req.query.search){
            search = req.query.search;
        }

        var page = 0;
        var per_page = 2;

        if(req.query.page){
            page = req.query.page;
        }

        let sliderdata = await slider.find({
            title: {$regex: search, $options: "i"}
        })
        .skip(page*per_page)
        .limit(per_page)

        let totaldata = await slider.find({
                title: {$regex: search, $options: "i"}
        }).countDocuments();
        var totalpages = Math.ceil(totaldata/per_page);
        var currentpage = page;

        if(sliderdata){
            return res.render('view_slider',{
                sliderdata,
                page: totalpages,
                currentpage,
                search
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
}

module.exports.delete = async (req,res) => {
    try{
        let data = await slider.findById(req.params.id);
        if(data){
            var img = path.join(__dirname, '..', data.sliderimage);
            try{
                fs.unlinkSync(img);
            }
            catch(e){
                console.log(e);
                req.flash('error',"image not delete");
                return res.redirect('back');
            }
            let del = await slider.findByIdAndDelete(req.params.id);
            if(del){
                req.flash('success',"data deleted");
                return res.redirect('back');
            }
            else{
                req.flash('error',"data not deleted");
                return res.redirect('back');
            }
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
}

module.exports.update = async (req,res) => {
    try{
        let data = await slider.findById(req.params.id);
        if(data){
            return res.render('update_slider',{
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
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}

module.exports.edit = async (req,res) => {
    try{
        if(req.file){
            let single = await slider.findById(req.params.id);
            if(single){
                var ipath = path.join(__dirname, "..", single.image);
                try{
                    await fs.unlinkSync(ipath);
                }
                catch(e){
                    req.flash('error','image is not deleted');
                    return res.redirect('back');
                }
                req.body.sliderimage = slider.imgpath + '/' + req.file.filename;
                let udata = await slider.findByIdAndUpdate(req.params.id, req.body);
                if(udata){
                    req.flash('success',"data updated");
                    return res.redirect('/admin/slider/view_slider');
                }
                else{
                    req.flash('error',"data is not updated");
                    return res.redirect('back');
                }
            }
            else{
                req.flash('error',"data is not found");
                return res.redirect('back')
            }
        }
        else{
            let single = await slider.findById(req.params.id);
            if(single){
                req.body.sliderimage = single.sliderimage;
                let udata = await slider.findByIdAndUpdate(req.params.id, req.body);
                if(udata){
                    req.flash('success',"data updated");
                    return res.redirect('/admin/slider/view_slider');
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
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
};

// SOFT DELETE START
module.exports.deactive = async (req,res) => {
    try{
        let Sliderdata = await slider.findByIdAndUpdate(req.params.id, {status: false});
        if(Sliderdata){
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
        let Sliderdata = await slider.findByIdAndUpdate(req.params.id, {status: true});
        if(Sliderdata){
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