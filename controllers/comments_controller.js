const Comment = require('../models/comment');
const Post = require('../models/post');
//we need to create a comment over a post
module.exports.create = function(req,res){

    // find if the post exist (finf the post with the post id first then create a comment if post exist)
    Post.findById(req.body.post , function(err,post){
       
        //if the post is found
        if(post){
            Comment.create({
                content: req.body.content,
                post:req.body.post,  //or post._id
                user: req.user._id
            },function(err,comment){
                //handle error


                //when the comments got created(adding comment to the post database)
                post.comments.push(comment);

                //get saved in the database
                post.save();

                res.redirect('/');
            });
        }
    });
}