const express = require('express');

const routes = express.Router();

const passport = require('../config/passportlocal');

routes.use('/admin', require('./admin'));

routes.use('/', require('./user'));

module.exports = routes;