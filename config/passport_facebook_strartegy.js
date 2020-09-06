const passport = require('passport');
const crypto = require('crypto');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');


passport.use(new FacebookStrategy({
    clientID: '626911698238686',
    clientSecret: '0d2fd2e2a72817d037276c19e2d2934b',
    callbackURL: "http://localhost:8000/user/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails','gender'],
    passReqToCallback:true,
  },
  function(req,accessToken, refreshToken, profile, cb) {
//         //find user by email in databaase with check of google profile email arrsay first email
     
        User.findOne({  facebookId:profile.id}).exec(function (err, user) {
            if (err) {
                console.log('Error in finding User google--> Passport',err)
                return ;
            }
            console.log(accessToken);
            console.log(profile);

            if(user){
                return cb(null, user);
            }
            //if user does not found then create a new user
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.id,
                    password:crypto.randomBytes(20).toString('hex'),
                    avatar:profile.photos[0].value,
                    facebookId:profile.id
                },function (err, user) {
                    if (err) {
                        console.log('Error in creating User google--> Passport',err)
                        return ;
                    }
                    return cb(null, user);
                })
            }
        });
    
  }
));
module.exports= passport;
