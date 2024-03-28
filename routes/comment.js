const express =  require('express');

const routs = express.Router();

const commentctrl = require('../controller/commentcontroller');

routs.get('/viewcomment/', commentctrl.viewcomment);

module.exports = routs;