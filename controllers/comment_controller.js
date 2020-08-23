const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.commenting=(req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        if(err){
                console.log('error in post ');
                return;
            }
        if(post){
            Comment.create({
                content:req.body.comment_content,
                user:req.user._id,
                post:req.body.post
                
            },(err,comment)=>{
                if(err){
                    req.flash('error','there is an error in commenting');
                    console.log('error in post ');
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            });
        }
    })
  
    
}