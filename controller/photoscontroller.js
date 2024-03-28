const photos = require('../models/photos');

module.exports.add_photos = (req,res) => {
    try{
        return res.render('add_photos');
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}

module.exports.insertphotos = async (req,res) => {
    try{
        var img = '';
        if(req.file){
            img = photos.imgpath + '/' + req.file.filename;
        }
        else{
            req.flash('error',"No image selected");
        }
        req.body.photosimage = img;
        let data = await photos.create(req.body);
        if(data){
            req.flash('success',"data inserted successfully");
            return res.redirect('back');
        }
        else{
            req.flash('error',"no data inserted");
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}

module.exports.view_photos = async (req,res) => {
    try{
        var search = '';
        if(req.query.search){
            search = req.query.search;
        }
        let data = await photos.find({
            title: {$regex: search, $options: "i"}
        });
        return res.render('view_photos',{
            data
        })
    }
    catch(e){
        console.log(e);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}