const comment = require('../models/comment');

module.exports.viewcomment = async (req,res) => {
    try{
        let commentdata = await comment.find({}).populate('postId').exec();
        if(commentdata){
            return res.render('view_comment',{
                commentdata
            })
        }
        else{
            req.flash('error',"data not found");
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error','somthing went wrong');
        return res.redirect('back');
    }
}