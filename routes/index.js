const express = require('express');
const router = express.Router();

//import homecontroller from controllers
const homeController= require('../controllers/home.controller')

//router for home page
router.get('/',homeController.home);

//router for about page
router.get('/about',homeController.about);

module.exports=router;