const express = require('express');
const router = express.Router();

//import homecontroller from controllers
const homeController= require('../controllers/home.controller')


//router for home page
router.get('/',homeController.home);
router.get('/sign-out',homeController.signOut);

//user router
router.use('/user',require('./user'))
router.use('/post',require('./post'))
router.use('/comment',require('./comment'))


module.exports=router;