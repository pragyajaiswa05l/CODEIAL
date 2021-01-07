const mongoose = require('mongoose');

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