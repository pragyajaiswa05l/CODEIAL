// 1) Import the express module
const express = require('express');
const app = express();

// 2) defining port no.
const port = 8000;

// use express router for home
app.use('/', require('./routes'));

// set up the view engine as ejs
app.set('view engine','ejs');
app.set('views','./views');

// 3) Running the express server on defined port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`Server is running  on port : ${port}`);
})
