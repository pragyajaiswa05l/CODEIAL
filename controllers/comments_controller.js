const Comment = require('../models/comment');
const Post = require('../models/post');
//we need to create a comment over a post
module.exports.create = async function(req,res){

    try{

        // find if the post exist (finf the post with the post id first then create a comment if post exist)
        let post = await Post.findById(req.body.post );
       
        //if the post is found
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,  //or post._id
                user: req.user._id
            });

            //when the comments got created(adding comment to the post database)
            post.comments.push(comment);

            //get saved in the database
            post.save();

            res.redirect('/');
        
        }

    }
    catch(err){
        console.log('Error',err);
        return;
    }

    

}


//delete the comment
module.exports.destroy = async function(req,res){

    try{

        //find the comment
        let comment = await Comment.findById(req.params.id);
            
        if(comment.user == req.user.id){

            //first save the postid then delete the comment
            let postId = comment.post;
            //delete the comment from the comment database
            comment.remove();

            //delete the comment from the post.pull out the comment id from the  list of comment
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments:req.params.id}});
            return res.redirect('back');
            
        }
        //if it doesn't match
        else{
            return res.redirect('back');
        }

    }catch(err){

        console.log('Error' , err);
        return;
    }
    
    
}