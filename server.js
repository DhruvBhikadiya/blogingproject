const express = require('express');

const path = require('path');
const mongoose = require('mongoose');

const port = 8080;

const app = express();

// const db = require('./config/mongoose');/

mongoose.connect(
    "mongodb+srv://dhruv1:123@dhruv01.ndmjk7s.mongodb.net/blogproject",
    { useNewUrlParser: true }
).then(result => {
    console.log('db is connected');
})
.catch(err => {
    console.log(err);
});

const admin = require('./models/admin');

const cp = require('cookie-parser');

const passportlocal = require('./config/passportlocal');

const flashmessage = require('./config/flashmessages');

const connectflash = require('connect-flash');

// EJS SETUP START
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//  EJS SETUP END

app.use(cp());

app.use(express.urlencoded());

// ASSETS FOLDER SETUP START
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'userassets')));
//  ASSETS FOLDER SETUP END

// UPLOADS FOLDER SETUP START
app.use('/uploades', express.static(path.join(__dirname, 'uploades')));
// UPLOADS FOLDER SETUP END

const passport = require('passport');
const session = require('express-session');

app.use(session({
    name: 'admin',
    secret: 'dhruv',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passportlocal.setAuth);

app.use(connectflash());
app.use(flashmessage.setflash);

// ROUTES START
app.use('/', require('./routes'));
//  ROUTES END

app.listen(port, (e) => {
    e ? console.log(e) : console.log("Server is running on port :- ", port);
})