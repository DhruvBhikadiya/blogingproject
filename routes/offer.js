const express = require('express');

const routes = express.Router();

const offerctrl = require('../controller/offercontroller');

routes.get('/add_offer', offerctrl.add);

routes.post('/offerinsert', offerctrl.insertoffer);

routes.get('/view_offer',offerctrl.view_offer);

// routes.get('/admindelete/:id', offerctrl.admindelete);

routes.get('/adminupdate/:id', offerctrl.adminupdate);

routes.post('/edit/:id', offerctrl.edit);

// SOFT DELETE START
routes.get('/deactive/:id', offerctrl.deactive);

routes.get('/active/:id', offerctrl.active);
// SOFT DELETE END

module.exports = routes;