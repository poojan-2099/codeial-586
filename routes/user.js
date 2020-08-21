const express = require('express');
const router = express.Router();
const passport = require('passport');

//import homecontroller from controllers
const userController= require('../controllers/users_controller')

//router for home page
router.get('/sign_Up',userController.signUp);
router.get('/sign_In',userController.signIn);
router.get('/profile',passport.checkAuthentication,userController.userProfile);
router.post('/create', userController.create);
router.post('/create-session',
            passport.authenticate('local', { failureRedirect: '/user/sign_In',failureFlash:true,}),
            userController.loginUser);
// router.get('/sign-out',userController.signOut);

module.exports=router;