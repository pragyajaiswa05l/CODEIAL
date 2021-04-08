const nodeMailer = require('../config/nodemailer');
const { countDocuments } = require('../models/user');

//need to create a function which will send that mail




//this is an another way of exporting a method
exports.newComment =(comment) => {
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from: 'prag05jaiswal@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: '<h1>Yup, your comment is now published!'
    }, (err, info) =>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent' , info);
        return;
    });
}