const Post = require('../models/post')
const User = require('../models/user')

module.exports.posting=(req,res)=>{
    Post.create({
        content:req.body.post_content,
        user:req.user._id
    },(err,post)=>{
        if(err){
            req.flash('error','there is an error in posting');
            console.log('error in post ');
            return;
        }
        return res.redirect('back');
    });
    
}