const express = require('express');

const routes = express.Router();

const userctrl = require('../controller/usercontroller');

const comment = require('../models/comment');

routes.get('/', userctrl.home);

routes.get('/blogsingle/:id', userctrl.blogsingle);

routes.post('/addcomment/:id',comment.uploadimage, userctrl.addcomment);

routes.get('/work_3columns', userctrl.work_3columns);

module.exports = routes;