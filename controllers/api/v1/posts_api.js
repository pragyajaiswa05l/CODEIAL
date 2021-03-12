//Since we are finding from the post schema and comment schema so we need to require it
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req, res){


        //populate the user of each post ,this query will return all the post
        //awaited for this post to be completed
        //find all the post in the database
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

    return res.json(200,{
        message: "List of posts",
        posts: posts
    });
    
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

            




            
            return res.json(200,{
                message: "Post and associated comments deleted successfully!"
            });
            
        
       // if user didn't match
        }else{
            //since user is not matching
            return res.json(401, {
                message: "You cannot delete this post!"
            });
        }

    }
    catch(err){
        // console.log('Error', err);
        console.log('********', err);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
    
}
