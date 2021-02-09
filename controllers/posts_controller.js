const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req , res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    //find whether the post exist or not before deleting it
    Post.findById(req.params.id, function(err,post){
        //.id means converting the object id into string
        //if post exist
        //check whether the user who is deleting the post is the same user who has written the post
        if(post.user == req.user.id){
            //delete the post and the comment also from that post
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });


    
        }
        //if user didn't match
        else{
            return res.redirect('back');
        }
    });
}
