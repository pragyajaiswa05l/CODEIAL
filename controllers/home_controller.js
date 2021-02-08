const Post = require('../models/post');



module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial!</h1>');

    //console.log(req.cookies);
   // res.cookie('user_id',25);

   //this query will return all the post
//    Post.find({},function(err,posts){
//         return res.render('home',{
//             title:"Codeial | Home",
//             posts: posts
//         });
//    });


//populate the user of each post
Post.find({})
.populate('user')

//when we need to populate multiple models i.e we need to get the comment and the user of the comment
.populate({
    path: 'comments',
    populate:{
        path: 'user'
    }
})
.exec(function(err,posts){
    return res.render('home',{
        title:"Codeial | Home",
        posts: posts
    });
});


    
}

// module.exports.actionName = function(req, res){}