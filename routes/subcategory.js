const subcategory = require('../models/subcategory');

const express = require('express');

const routes = express.Router();

const subcategoryctrl = require('../controller/subcategory');

routes.use('/add_subcategory', subcategoryctrl.add_subcategory);

routes.use('/subcategoryinsert',subcategory.uploadimage , subcategoryctrl.subcategoryinsert);

routes.use('/view_subcategory', subcategoryctrl.view_subcategory);

module.exports = routes;