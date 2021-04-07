const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//we need to tell passport to use google strategy also
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"342509023559-1se8d5ie9td966ok2nch5g18ie4spqc2.apps.googleusercontent.com",
        clientSecret:"pqNaZ2fOSiif-JCY-LlBaOFI",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    //callback function
    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in google strategy-passport',err);
                return;
            }
            console.log(accessToken, refreshToken);
            console.log(profile);

            if(user){
                //if found set this user as req.user
                return done(null, user);
            }else{  
                // if not found create the user and set it as req.user (sign in that user)
                    User.create({
                        name: profile.displayName,
                        email:profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },function(err, user){
                        if(err){
                            console.log('error in creating user google strategy-passport',err);
                            return;
                        }
                        return done(null, user);
                    });
                 }
        });
    }
));
module.exports = passport;