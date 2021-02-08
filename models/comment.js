const mongoose = require('mongoose');



const commentSchema = new mongoose.Schema({
    //comment will also have a content
    content:{
        type: String,
        required: true
    },
    //comment belongs to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});

//we need to tell mongoose that this is going to be a collection
const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;