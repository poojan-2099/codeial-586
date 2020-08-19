const express = require('express');
const cookieParser= require('cookie-parser');
const app = express();
const port = 8000;
const db= require('./config/mongoose');
const expressLayouts= require('express-ejs-layouts');
// const path = require('path');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//exrtract style and script feom subpages to layout page
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));

//set view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// app.set('views', path.join(__dirname, 'views'));


//run app on port
app.listen(port, function (err) {
    if (err) {
        console.log('Upps There is an error', err);
    }
    console.log('Our Express is successfully Runnig on port', port);
});
