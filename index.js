// 1) Import the express module

//This means that the value of a variable declared with const remains the same within its scope. It cannot be updated or re-declared. 
const express = require('express');

// require the cookie parser to use 
const cookieParser = require('cookie-parser');

//The app object conventionally denotes the Express application. Create it by calling  express() function exported by the Express module:
const app = express();

// 2) defining port no.
const port = 8000;

// import the express layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// require the mongoose library/modules
 const db = require('./config/mongoose');


 //used for session cookie
 const session = require('express-session');

 const passport = require('passport');

 const passportLocal = require('./config/passport-local-strategy');

 const MongoStore = require('connect-mongo')(session);

 const sassMiddleware = require('node-sass-middleware');

 const flash = require('connect-flash');
 const customMware = require('./config/middleware');




 app.use(sassMiddleware({
     src: './assets/scss',
     dest: './assets/css',
     debug: true,
     outputStyle: 'extended',
     prefix: '/css'
 }));

 //reading through the post request
 app.use(express.urlencoded());

 //setting up the cookie
 app.use(cookieParser());

// setting up static files access(Then we define the directory from which to serve our static files.)
app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set up the view engine as ejs
//Express uses jade as its default template engine,so we would have to tell it to use ejs instead 
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name :'codeial',
    //todo change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//set the flash to be used
app.use(flash());
//to use the custom middleware made in config folder
app.use(customMware.setFlash);

// use express router for home
app.use('/', require('./routes'));

// 3) Running the express server on defined port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`Server is running  on port : ${port}`);
})
