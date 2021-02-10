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


//delete the comment
module.exports.destroy = function(req,res){
    //find the comment
    Comment.findById(req.params.id,function(err,comment){
        
        if(comment.user == req.user.id){

            //first save the postid then delete the comment
            let postId = comment.post;
            //delete the comment from the comment database
            comment.remove();

            //delete the comment from the post.pull out the comment id from the  list of comment
            Post.findByIdAndUpdate(postId, { $pull: {comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });
        }
        //if it doesn't match
        else{
            return res.redirect('back');
        }
    });
}