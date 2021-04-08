const nodeMailer = require('../config/nodemailer');
//const { countDocuments } = require('../models/user');

//need to create a function which will send that mail




//this is an another way of exporting a method
exports.newComment =(comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'prag05jaiswal@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (err, info) =>{              //call back function
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Mail deliver' , info);
        return;
    });
}