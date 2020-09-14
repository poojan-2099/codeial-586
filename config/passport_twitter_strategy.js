const passport = require('passport');
const crypto = require('crypto');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');

passport.use(new TwitterStrategy({
    consumerKey: 'ZANY3siWoQih4LRoi7SRK9ACT',
    consumerSecret: '1jjID5QyFi2dKjCILl01SxAZEmNBreo4yQcI438mOYvCZSrWtQ',
    callbackURL: "http://localhost:8000/user/auth/twitter/callback",
    userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
  },
  function(token, tokenSecret, profile, cb) {
    
    User.findOne({  TwitterId:profile.id }).exec(function (err, user) {
        if (err) {
            console.log('Error in finding User google --> Passport',err)
            return ;
        }
        // console.log(accessToken);
        console.log(profile);

        if(user){
            return cb(null, user);
        }
        //if user does not found then create a new user
        else{
            User.create({
                name:profile.displayName,
                email: profile.id,
                password:crypto.randomBytes(20).toString('hex'),
                avatar:profile.photos[0].value,
                TwitterId:profile.id
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