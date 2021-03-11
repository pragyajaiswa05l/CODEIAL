const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//we are trying to find out user from the database whenever the request comes in and the header contain the jwt
const User = require('../models/user');



let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial'
}

//tell passport to use jwt strategy
passport.use(new JWTStrategy(opts , function(jwtPayLoad, done){

    //find the user based on the information in the payload
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }

        //if user is found
        if(user){
            return done(null, user);
        }else{
            //false means that the user was not found
            return done(null, false);
        }
    });
}));

module.exports = passport;