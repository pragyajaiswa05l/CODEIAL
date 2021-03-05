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
            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success','Comment published!');

            res.redirect('/');
        
        }

    }
    catch(err){
        //console.log('Error',err);
        req.flash('error',err);
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

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success','Comment deleted!');
            return res.redirect('back');
            
        }
        //if it doesn't match
        else{
            req.flash('error','Unauthorized');
            return res.redirect('back');
        }

    }catch(err){

        //console.log('Error' , err);
        req.flash('error',err);
        return;
    }
    
    
}