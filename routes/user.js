const express = require('express');
const router = express.Router();

//import homecontroller from controllers
const userController= require('../controllers/users_controller')

//router for home page
router.get('/sign_Up',userController.signUp);
router.get('/sign_In',userController.signIn);
router.get('/profile',userController.userProfile);
router.post('/create', userController.create);
router.post('/create-session',userController.loginUser);

module.exports=router;