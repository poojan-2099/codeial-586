const nodemailer= require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'apixcommunication.com@gmail.com', // generated ethereal user
      pass: 'Apix@1708', // generated ethereal password
    },
  });

let renderTemplate =(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
    path.join(__dirname,'../views/mailers', relativePath),
    data,
    function(err,template){
        if(err){
            console.log('Err in rendering template');
            return;
        }
        mailHTML=template;
    }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}