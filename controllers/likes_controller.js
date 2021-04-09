const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");


//creating an action
module.exports.toggleLike = async function(req, res){
    try{

        //our url will be shaped in this way ->likes/toggle/?id=abcdef&type=Post
        //take out our likeable
        let likeable;
        let deleted = false;


        //finding likeable for post
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
            // finding  likeable for comment
            likeable = await Comment.findById(req.query.id).populate('likes');
        }



        //check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })


        //if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }else{
            //else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(like._id);
            likeable.save();
            
        }

        return res.json(200, {
            message: "Request successful",
            data: {
                deleted: deleted
            }
        });

    }catch(err){
        //like is going to work with ajax request so we send back a json data
        console.log(err);
        return res.json(500, {
            message:'Internal Server Error'
        });
    }
}