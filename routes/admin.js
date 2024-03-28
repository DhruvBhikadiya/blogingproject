const express = require('express');

const adminctrl = require('../controller/admincontroller');
const admin = require('../models/admin');

const passport = require('../config/passportlocal');

const routes = express.Router();

// SLIDER ROUTES
routes.use('/slider',passport.checkAuth, require('./slider'));

// OFFER ROUTES
routes.use('/offer',passport.checkAuth, require('./offer'));

// POSTS ROUTES
routes.use('/posts',passport.checkAuth, require('./posts'));

// PHOTOS ROUTES
routes.use('/photos',passport.checkAuth, require('./photos'));

// TESTIMONIAL ROUTES
routes.use('/testimonial',passport.checkAuth, require('./testimonial'));

// COMMENTS ROUTES
routes.use('/comment',passport.checkAuth, require('./comment'));

// CATEGORY ROUTES
routes.use('/category',passport.checkAuth, require('./category'));

// SUBCATEGORY ROUTES
routes.use('/subcategory',passport.checkAuth, require('./subcategory'));

// LOGIN START
routes.get('/', (req,res) => {
    return res.render("login");
});

// CHECK LOGIN
routes.post('/login',passport.authenticate('local',{failureRedirect: '/admin'}), adminctrl.checklogin);

// LOGIN END

// LOGOUT START
routes.get('/logout', (req,res) => {
    req.session.destroy((e)=>{
        if(e){
            console.log(e);
            return res.redirect('back');
        }
        else{
            return res.redirect('/admin');
        }
    })
})
// LOGOUT END

routes.get('/dashboard',passport.checkAuth, adminctrl.dashboard);
routes.get('/add',passport.checkAuth, adminctrl.add);
routes.get('/view',passport.checkAuth, adminctrl.view);
routes.get('/adminupdate/:id',passport.checkAuth, adminctrl.adminupdate);

// CRUD OPERATION START
routes.post('/insert',passport.checkAuth, admin.uploadimage , adminctrl.insert);
routes.get('/admindelete/:id',passport.checkAuth, adminctrl.admindelete);
routes.post('/edit/:id',passport.checkAuth, admin.uploadimage,adminctrl.edit);
// CRUD OPERATION END

// CHANGE PASS START
routes.get('/changepass',passport.checkAuth, adminctrl.changepass);
routes.post('/cpass',passport.checkAuth, adminctrl.cpass);
// CHANGE PASS END

// FORGOT PASS START
routes.get('/forgotpassword',adminctrl.forgotpassword);

routes.post('/varifyemail', adminctrl.varifyemail);

routes.get('/otp', adminctrl.otp);

routes.post('/verifyotp', adminctrl.verifyotp);

routes.get('/newpass', adminctrl.newpassword);

routes.post('/checkpass', adminctrl.checkpass);
// FORGOT PASS END

// PROFILE START
routes.get('/profile', passport.checkAuth, adminctrl.profile);
// PROFILE END

// SOFT DELETE START
routes.get('/deactive/:id',passport.checkAuth, adminctrl.deactive);

routes.get('/active/:id',passport.checkAuth, adminctrl.active);
// SOFT DELETE END

module.exports = routes;