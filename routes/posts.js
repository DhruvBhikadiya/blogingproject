const express = require('express');

const routes = express.Router();

const postsctrl = require('../controller/postscontroller');
const posts = require('../models/posts');

routes.get('/add_posts', postsctrl.add_posts);

routes.post('/insertposts', posts.uploadimage, postsctrl.insertposts);

routes.get('/view_posts',postsctrl.view_posts);

module.exports = routes