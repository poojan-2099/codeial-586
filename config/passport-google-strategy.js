const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//passport google strategy to find or create a user with google strategy
passport.use(new GoogleStrategy({
    clientID:'355677701312-o8sjeqntr8009qma5u348n3em58586vh.apps.googleusercontent.com',
    clientSecret: '7IPDLBe-MT-NckXIJRwm4LRb',
    callbackURL: "http://localhost:8000/user/auth/google/callback"
  },
//accesstoken and refresh token are use for authorization check by google
  function(accessToken, refreshToken, profile, cb) {
      //find user by email in databaase with check of google profile email arrsay first email
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if (err) {
            console.log('Error in finding User google--> Passport',err)
            return ;
        }
        // console.log(profile);
        if(user){
            return cb(null, user);
        }
        //if user does not found then create a new user
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex'),
                avatar:profile.photos[0].value
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