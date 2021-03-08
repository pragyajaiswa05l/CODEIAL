const mongoose = require('mongoose');


//importing multer
const multer = require('multer');
//requiring path(setting the path where file will be stored)
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');


// to create a schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    }
},{
    timestamps: true


});
const User = mongoose.model('User', userSchema);

module.exports = User;