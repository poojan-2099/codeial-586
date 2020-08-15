const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use express router
app.use('/',require('./routes/index'));

//run app on port
app.listen(port, function (err) {
    if (err) {
        console.log('Upps There is an error', err);
    }
    console.log('Our Express is successfully Runnig on port', port);
});
