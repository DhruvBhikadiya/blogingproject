const express = require('express');

const routes = express.Router();

const testi = require('../models/testimonial');
const testictrl = require('../controller/testimonial');

routes.get('/add_testimonial', testictrl.add);

routes.post('/inserttestimonial', testictrl.inserttostimonial);

routes.get('/view_testimonial', testictrl.view_testi);

module.exports = routes;