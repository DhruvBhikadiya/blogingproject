const admin = require('../models/admin');

const path = require('path');
const fs = require('fs');

const nodemailer = require('nodemailer');

// LOGIN
module.exports.checklogin = async (req,res) => {
    try{
        req.flash('success',"login successfull");
        return res.redirect('/admin/dashboard');
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}

// DASHBOARD
module.exports.dashboard = (req, res) => {
    try {
        return res.render('dashboard');
    }
    catch (e) {
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');

    }
}

// ADD DATA PAGE
module.exports.add = (req, res) => {
    try {
        return res.render('add');
    }
    catch (e) {
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');

    }
}

// VIEW DATA PAGE
module.exports.view = async (req, res) => {
    try {
        let search = '';
        if(req.query.search){
            search = req.query.search;
        }

        var page = 0;
        var per_page = 2;

        if(req.query.page){
            page = req.query.page;
        }

        let admindata = await admin.find({
            $or: [
                {name: {$regex: search,$options: "i"}},
                {gender: {$regex: search,$options: "i"}},
                {city: {$regex: search,$options: "i"}}
            ]
        })
        .skip(page*per_page)
        .limit(per_page)

        let totaldata = await admin.find({
            $or: [
                {name: {$regex: search,$options: "i"}},
                {gender: {$regex: search,$options: "i"}},
                {city: {$regex: search,$options: "i"}}
            ]
        }).countDocuments();
        var totalpages = Math.ceil(totaldata/per_page);
        var currentpage = page;

        if(admindata){
            return res.render('view',{
                adata: admindata,
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
    catch (e) {
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');

    }
}

// CRUD OPERATION START

// CREATE START
module.exports.insert = async (req, res) => {
    try {
        var img = '';
        if (req.file) {
            img = admin.imgpath + '/' + req.file.filename;
        }
        else {
            req.flash('error',"Data not inserted");
            return res.redirect('back');
        }
        req.body.image = img;
        req.body.name = req.body.fname + " " + req.body.lname;
        await admin.create(req.body);
        req.flash('success',"Data inserted");
        return res.redirect('back');
    }
    catch (e) {
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}
// CREATE END

// DELETE START
module.exports.admindelete = async (req,res) => {
    try{
        let single = await admin.findById(req.params.id);
        if(single){
            var imgpath = path.join(__dirname, '..', single.image);
            try{
                await fs.unlinkSync(imgpath);
            }
            catch(e){
                console.log(e);
                req.flash('error','image is not deleted');
                return res.redirect('back');
            }
            let del = await admin.findByIdAndDelete(req.params.id);
            if(del){
                req.flash('success','data is deleted');
                return res.redirect('back');
            }
            else{
                req.flash('error','data is not deleted');
                return res.redirect('back');
            }
        }
        else{
            req.flash('error','data is not found');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error','something went wrong');
        return res.redirect('back');
    }
}
// DELETE END

// UPDATE START

// SHOW UPDATE PAGE
module.exports.adminupdate = async (req,res) => {
    try{
        let single = await admin.findById(req.params.id);
        if(single){
            return res.render('update',{
                adata: single
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
        if(req.file){
            let single = await admin.findById(req.params.id);
            if(single){
                var ipath = path.join(__dirname, "..", single.image);
                try{
                    await fs.unlinkSync(ipath);
                }
                catch(e){
                    req.flash('error','image is not deleted');
                    return res.redirect('back');
                }
                req.body.image = admin.imgpath + '/' + req.file.filename;
                req.body.name = req.body.fname + " " + req.body.lname;
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
                return res.redirect('back')
            }
        }
        else{
            let single = await admin.findById(req.params.id);
            if(single){
                req.body.image = single.image;
                req.body.name = req.body.fname + " " + req.body.lname;
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
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}
// UPDATE END

// CRUD OPERATION END

// CHANGE PASS START
module.exports.changepass = async (req,res) => {
    try{
        return res.render('changepassword');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}
module.exports.cpass = async (req,res) => {
    try{
        if(req.body.cpass == req.user.password){
            if(req.body.cpass != req.body.npass){
                if(req.body.npass == req.body.cfpass){
                    await admin.findByIdAndUpdate(req.user.id, {password: req.body.npass});
                    console.log("password is changed");
                    req.flash('success', 'Password is Changed Successfully');
                    return res.redirect('/admin/logout');
                }
                else{
                    console.log('new password and confirm password are not matched');
                    req.flash('error', 'new password and confirm password are not matched');
                    return res.redirect('back');
                }
            }
            else{
                console.log('current password and new password are both same');
                req.flash('error', 'current password and new password are both same');
                return res.redirect('back');
            }
        }
        else{
            console.log('current password is not matched');
            req.flash('error', 'current password is not matchede');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}
// CHANGE PASS END

// FORGOT PASS START
module.exports.forgotpassword = async (req,res) => {
    try{
        return res.render('forgotpassword')
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}

module.exports.varifyemail = async (req,res) => {
    try{
        if(req.body){

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "dhruv.bhikadiya@gmail.com",
                    pass: "jtzgamamdukkdzhs",
                },
            });

            otp = Math.round(Math.random()*1000000);
            res.cookie('otp',otp);
            res.cookie('email',req.body.email);
            message = `<h1>here is your otp :- ${otp} </h3>`;

            const info = await transporter.sendMail({
                from: 'dhruvbhikadiya114@gmail.gom', // sender address
                to: req.body.email, // list of receivers
                subject: "Email Varification", // Subject line
                text: "Hello world?", // plain text body
                html: message, // html body
            });

            return res.redirect('/admin/otp');

        }
        else{
            req.flash('error',"invalid email");
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}

module.exports.otp = async (req,res) => {
    try{
        return res.render('otppage');
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}

module.exports.verifyotp = async (req,res) => {
    try{
        if(req.cookies.otp == req.body.otp){
            return res.redirect('newpass');
        }
        else{
            console.log('invalid otp');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.newpassword = async (req,res) => {
    try{
        return res.render('newpass');
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}

module.exports.checkpass = async (req,res) => {
    try{
        if(req.body.npass == req.body.cpass){
            checkemail = await admin.findOne({email : req.cookies.email});
            if(checkemail){
                let changepass = await admin.findByIdAndUpdate(checkemail.id, {
                    password : req.body.npass,
                });
                res.clearCookie('otp');
                res.clearCookie('email');
                req.flash('success','password changed');
                return  res.redirect('/admin');
            }
            else{
                req.flash('error','data is not found');
                return res.redirect('back');
            }
        }
        else{
            req.flash('error','new password and confirm password are not same');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error',"something went wrong");
        return res.redirect('back');
    }
}
// FORGOT PASS END

// PROFILE START
module.exports.profile = (req,res) => {
    try{
        return res.render('profile');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}
// PROFILE END

// SOFT DELETE START
module.exports.deactive = async (req,res) => {
    try{
        let admindata = await admin.findByIdAndUpdate(req.params.id, {status: false});
        if(admindata){
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
        let admindata = await admin.findByIdAndUpdate(req.params.id, {status: true});
        if(admindata){
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