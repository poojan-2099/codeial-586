const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory= path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory|| fs.mkdirSync(logDirectory));

const AccesslogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const developement ={
    name:'developement',
    asset_path:'./assets',
    session_cookie:'avengers',
    db:'codeial_User',
    smtp:{
        service:'gmail',
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'apixcommunication.com@gmail.com', // generated ethereal user
          pass: 'Apix@1708', // generated ethereal password
        },
      },
      FB_clientID: '626911698238686',
      FB_clientSecret: '0d2fd2e2a72817d037276c19e2d2934b',
      FB_callbackURL: "http://localhost:8000/user/auth/facebook/callback",
      GGL_clientId: '355677701312-o8sjeqntr8009qma5u348n3em58586vh.apps.googleusercontent.com',
      GGL_clientSecret: '7IPDLBe-MT-NckXIJRwm4LRb',
      GGL_callbackURL: "http://localhost:8000/user/auth/google/callback",
      TTR_consumerKey: 'ZANY3siWoQih4LRoi7SRK9ACT',
      TTR_consumerSecret: '1jjID5QyFi2dKjCILl01SxAZEmNBreo4yQcI438mOYvCZSrWtQ',
      TTR_callbackURL: "http://localhost:8000/user/auth/twitter/callback",
      TTR_userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
      jwt_secret :'codeial',
      morgan:{
          mode:'dev',
          options:{stream:AccesslogStream}
      }
}
const production = {
    name:'production',
    asset_path : process.env.APIX_ASSET_PATH,
    session_cookie: process.env.APIX_SESSION_COOKIE,
    db:process.env.APIX_DB,
    smtp:{
        service:'gmail',
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.APIX_AUTH_USER, // generated ethereal user
          pass: process.env.APIX_AUTH_PASS, // generated ethereal password
        },
      },
      FB_clientID: process.env.APIX_FBID,
      FB_clientSecret: process.env.APIX_FB_CS,
      FB_callbackURL: process.env.APIX_FBCB,
      GGL_clientId: process.env.APIX_GGLID,
      GGL_clientSecret: process.env.APIX_GGLSEC,
      GGL_callbackURL: process.env.APIX_GGLCLU,
      TTR_consumerKey: process.env.APIX_TID,
      TTR_consumerSecret: process.env.APIX_TSEC,
      TTR_callbackURL: process.env.APIX_TCB,
      TTR_userProfileURL :'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
      jwt_secret :process.env.APIX_JWT,
      morgan:{
        mode:'combined',
        options:{stream:AccesslogStream}
    }
}

module.exports=eval(process.env.NODE_ENV)==undefined ? developement:eval(process.env.NODE_ENV);
