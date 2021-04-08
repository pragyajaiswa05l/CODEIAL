const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

//this is the part which sends the email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'jaiskajal05',
        pass: '12345678@@'
    }
});

// it define whenever i m going to send an html email where the file would be placed inside mailer folder of views folder
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template',err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}