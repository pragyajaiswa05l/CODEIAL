const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res){


    //to handle success and error 
    try{

        //populate the user of each post ,this query will return all the post
        //awaited for this post to be completed
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')

        //when we need to populate multiple models i.e we need to get the comment and the user of the comment
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        });


        //find all the users to display in home.ejs
        //we awaited for the user search query to be completed
        let users = await User.find({});
                
        
        //after the post and user then we return something to the browser
        return res.render('home',{
            title:"Codeial | Home",
            posts: posts,
            all_users: users
        });    



    }catch(err){

        console.log('Error', err);
        return;

    }

    

    
}

// module.exports.actionName = function(req, res){}

// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
