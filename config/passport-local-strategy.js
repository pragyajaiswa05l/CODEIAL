//import the passport module 
const passport = require('passport');


//import the passport-local specifically the Strategy property.
const LocalStrategy = require('passport-local').Strategy;

//import the user.js file from models
const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email: email}, function(err,user) {
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            // When all things are good, we return the user
            return done(null,user);
        });
    }
));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});


module.export = passport;

