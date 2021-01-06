// 1) Import the express module

//This means that the value of a variable declared with const remains the same within its scope. It cannot be updated or re-declared. 
const express = require('express');

//The app object conventionally denotes the Express application. Create it by calling  express() function exported by the Express module:
const app = express();

// 2) defining port no.
const port = 8000;

// import the express layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);


// setting up static files access
app.use(express.static('./assets'));


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// use express router for home
app.use('/', require('./routes'));

// set up the view engine as ejs
//Express uses jade as its default template engine,so we would have to tell it to use ejs instead 
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
