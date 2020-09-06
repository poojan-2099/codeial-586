const nodemailer =require('../config/nodemailer');


exports.newComment = (comment)=>{
    console.log('inside new comment mailer');

    nodemailer.transporter.sendMail({
        from:'apixcommunication@gmail.com',
        to: comment.user.email, // list of receivers
        subject: "New Comment published ✔", // Subject line
       
        html: "<h1>Your comment is send now</h1>", // html body
    
    },(err,info)=>{
        if(err){
            console.log('error un sending mail ',err);
            return;
       }
       console.log('mail delivered',info);
       return;  

    })
}