const express = require('express');
const router = express.Router();

//import homecontroller from controllers
const homeController= require('../controllers/data_controller')

//router for home page
router.get('/data',homeController.data);


module.exports=router;