const express = require('express');
const router = express.Router();

//import homecontroller from controllers
const homeController= require('../controllers/users_controller')

//router for home page
router.get('/profile',homeController.user);


module.exports=router;