const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    //like belong to the user
    user:{
        type: mongoose.Schema.ObjectId
    },
    //we need to store two things the type on which the like has been placed and the objectid on which the like has been placed

    //this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }

},{
    //at what time did i like it
    timestamps: true
});

//tell mongoose this is a model
const Like = mongoose.model('Like',likeSchema);
module.exports = Like;