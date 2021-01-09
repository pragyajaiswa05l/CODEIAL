//to use the schema
const User = require('../models/user');


//render the user profile page

module.exports.profile = function(req,res){
    //res.end('<h1>User Profile</h1>');

    //check if user_id is present in the cookies
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
           
           //if user is found then we redirect to the profile page
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                });
            }

            //if user is not found redirect to sign in page
            return res.redirect('/users/sign-in');
        });
    }
    //if user id is not present send the user to sign in page
    else{
        return res.redirect('/users/sign-in');
    }
    

}


//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}


//render the sign in page
module.exports.signIn = function(req,res){
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
    
    //steps to authenticate

    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }

        //handle user found

        if(user){

            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            //handle user not found
            return res.redirect('back');
        }
    });
}