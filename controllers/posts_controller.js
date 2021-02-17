const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req , res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post published!')
        return res.redirect('back');
        

    }catch(err){
        // console.log('Error' ,err);
        req.flash('error',err);
        return res.redirect('back');
    }
    
}

module.exports.destroy = async function(req,res){
    try{

        //find whether the post exist or not before deleting it
        let post = await Post.findById(req.params.id);


        //.id means converting the object id into string
        //if post exist
        //check whether the user who is deleting the post is the same user who has written the post
        if(post.user == req.user.id){
        //delete the post and the comment also from that post
             post.remove();

            await Comment.deleteMany({post:req.params.id});
            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
            
        }
        //if user didn't match
        else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }
    catch(err){
        // console.log('Error', err);
        req.flash('error',err);
        return res.redirect('back');
    }
    
}
