const express =  require('express');

const routs = express.Router();

const categoryctrl = require('../controller/category');

routs.get('/add_category', categoryctrl.add_category);

routs.post('/categoryinsert', categoryctrl.categoryinsert);

routs.get('/view_category', categoryctrl.view_category);

module.exports = routs;