//to use the schema
const User = require('../models/user');


//render the user profile page

module.exports.profile = function(req,res){
    //res.end('<h1>User Profile</h1>');
    return res.render('user_profile',{
        title:"User Profile"
    });
}


//render the sign up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}


//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){

    //check if password and confirm password are same or not 
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back'); //go the same page it came from
    }

    //if the user doesn't exit create it
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }

        if(!user){
            User.create(req.body , function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                } 
                return res.redirect('/users/sign-in'); 
            })
        }

        //if user already exist
        else{
            return res.redirect('back');
        }
    });
}


//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}