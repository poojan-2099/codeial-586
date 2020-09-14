const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportGoogle = require('./config/passport-google-strategy');
const passportFacebook = require('./config/passport_facebook_strartegy');
const passportTwitter = require('./config/passport_twitter_strategy');
const passportJwt = require('./config/passport_jwt-strategy')
const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const sassMiddleware = require('node-sass-middleware');
const nocache = require('nocache');
const moment = require('moment');

// const path = require('path');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:false,
    outputStyle:'expanded',
    prefix:'/css'
}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//make upload folder awailable to browser
app.use('/upload',express.static(__dirname+'/upload'));
app.use(expressLayouts);
//exrtract style and script feom subpages to layout page
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name:'codeial',
    secret:'avengers',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*3600*24)
    },
    store: new mongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disable'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

//initialize passport js for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//using flash for showing messages 
app.use(flash());
app.use(customMware.setFlash);
app.use(nocache());


//use express router
app.use('/', require('./routes'));

//run app on port
app.listen(port, function (err) {
    if (err) {
        console.log('Upps There is an error', err);
    }
    console.log('Our Express is successfully Runnig on port', port);
});
