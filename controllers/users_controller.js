//to use the schema
const User = require('../models/user');


//render the user profile page

//lets keep it same as before(i.e don't use async await for profile because there is no nesting level there is only one call back)
module.exports.profile = function(req,res){
    //res.end('<h1>User Profile</h1>');

    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user: user
        });
    });
    
}



module.exports.update =  async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         req.flash('success','Updated!');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error','Unauthorized');
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){

        try{
            //find the user
            let user = await User.findById(req.params.id);
            // once the user has been found we need to update the user
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('*******Multer Error: ',err);
                }
                //console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                //analyse the request part over here and send something back alongside with the response when we have saved the user
                
                //if request has a file
                if(req.file){
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            });


        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }

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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back'); //go the same page it came from
    }

    //if the user doesn't exit create it
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            //console.log('error in finding user in signing up');
            req.flash('error', err);
            return;
        }

        if(!user){
            User.create(req.body , function(err,user){
                if(err){
                    //console.log('error in creating user while signing up');
                    req.flash('error', err);
                    return;
                } 
                return res.redirect('/users/sign-in'); 
            })
        }

        //if user already exist
        else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });
}


//sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success' , 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success' , 'You have Logged out!');
    return res.redirect('/');
}