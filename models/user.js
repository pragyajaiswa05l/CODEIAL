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
    },
    avatar: {
        type:String
    }
},{
    timestamps: true


});

// defining a storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb ->callback
      cb(null, path.join(__dirname, '..',AVATAR_PATH)); // the exact path where the file need to be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });



  //static methods
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH; // to be available publically for user model





const User = mongoose.model('User', userSchema);

module.exports = User;