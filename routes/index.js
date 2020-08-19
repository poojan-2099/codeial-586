const express = require('express');
const router = express.Router();

//import homecontroller from controllers
const homeController= require('../controllers/home.controller')

//router for home page
router.get('/',homeController.home);

//user router
router.use('/user',require('./user'))


module.exports=router;