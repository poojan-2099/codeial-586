const express = require('express');
const router = express.Router();

//import homecontroller from controllers
const homeController = require('../controllers/post_controller')

//router for home page
router.post('/post',homeController.post);
console.log('post is running')


module.exports=router;