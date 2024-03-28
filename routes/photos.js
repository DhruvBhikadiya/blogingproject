const express = require('express');

const routes = express.Router();

const photos = require('../models/photos');
const photosctrl = require('../controller/photoscontroller');

routes.get('/add_photos',photosctrl.add_photos);

routes.post('/insertphotos',photos.uploadimage, photosctrl.insertphotos);

routes.get('/view_photos', photosctrl.view_photos);

module.exports = routes;