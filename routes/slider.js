const slider = require('../models/slider');

const express = require('express');

const routes = express.Router();

const sliderctrl = require('../controller/slidercontroller');

routes.get('/add_slider', sliderctrl.add);

routes.post('/insertslider',slider.uploadimage, sliderctrl.insertslider);

routes.get('/view_slider',sliderctrl.view_slider);

routes.get('/sliderdelete/:id', sliderctrl.delete);

routes.get('/sliderupdate/:id', sliderctrl.update);

routes.post('/edit/:id',slider.uploadimage, sliderctrl.edit);

// SOFT DELETE START
routes.get('/deactive/:id', sliderctrl.deactive);

routes.get('/active/:id', sliderctrl.active);
// SOFT DELETE END

module.exports = routes;