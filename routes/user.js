const express = require('express');
const router = express.Router();
const passport = require('passport');

//import homecontroller from controllers
const userController= require('../controllers/users_controller');

//router for home page
router.get('/sign_Up',userController.signUp);
router.get('/sign_In',userController.signIn);

router.get('/profile/:id',passport.checkAuthentication,userController.userProfile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.post('/create', userController.create);
router.post('/create-session',
            passport.authenticate('local', { failureRedirect: '/user/sign_In',failureFlash:true,}),
            userController.loginUser);
// router.get('/sign-out',userController.signOut);
router.get('/auth/google',
            passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
            passport.authenticate('google', { failureRedirect: '/user/sign_In' }),
            userController.loginUser );

router.get('/auth/facebook',
            passport.authenticate('facebook', { scope: ['public_profile','email','user_friends'] }));

router.get('/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/user/sign_In'  }),
            userController.loginUser );



module.exports=router;