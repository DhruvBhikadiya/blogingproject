const offer = require('../models/offer');
const slider = require('../models/slider');
const posts = require('../models/posts');
const photos = require('../models/photos');
const testi = require('../models/testimonial');
const comment = require('../models/comment');
const category = require('../models/category');
const subcategory = require('../models/subcategory');

const moment = require('moment');

module.exports.home = async (req,res) => {
  try{
    let sliderdata = await slider.find({status: true});
    let offerdata = await offer.find({status: true});
    let postsdata = await posts.find({status: true});
    let photosdata = await photos.find({status: true});
    let testidata = await testi.find({status: true});
    return res.render('userpannel/user_home',{
      sliderdata,
      offerdata,
      postsdata,
      photosdata,
      testidata
    })
  }
  catch(e){
    console.log(e);
    req.flash('error',"something went wrong");
    return res.redirect('back');
  }
}

module.exports.blogsingle = async (req,res) => {
  try{
    let allids = await posts.find();
    var ids = [];
    allids.map((v,i) => {
      ids[i] = v.id;
    })
    var pos ;
    ids.map((v,i) => {
      if(v==req.params.id){
        pos = i
      }
    })  
  
    // COMMENT
    let commentdata = await comment.find({postId: req.params.id});

    // VIEW LAST THREE COMMENT
    let pdata = await posts.find().sort({_id:-1}).limit(3);
    console.log(pdata);

    let data = await posts.findById(req.params.id);
    if(data){
      return res.render('userpannel/blogsingle',{
        data,
        pos,
        ids,
        commentdata,
        pdata
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

module.exports.addcomment = async (req,res) => {
  try{
    var img = '';
    if(req.file){
        img = comment.imgpath+'/'+req.file.filename;
        req.body.commentimage = img;
        req.body.status = true;
        req.body.create_date = moment().format('LLL');
        let addcomment = await comment.create(req.body);
        if(addcomment){
            req.flash('success', 'Comment added successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Something went wrong');
            return res.redirect('back');
        }
    }
}
catch(e){
    console.log(e);
    req.flash('error', 'something went wrong');
    return res.redirect('back');
}
};

module.exports.work_3columns = async (req,res) => {
  try{
    const catdata = await category.find({});
    const subcatdata = await subcategory.find({});
    return res.render('userpannel/work_3columns',{
      catdata,
      subcatdata
    });
  }
  catch(e){
    console.log(e);
    req.flash('error', 'something went wrong');
    return res.redirect('back');
  }
}