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
    });
  
    
}

module.exports.destroy=(req,res)=>{
    Comment.findById(req.params.id).populate('post').exec((err,comment)=>{
        if(err){
            console.log('error in finding post ');
            return;
        }
        if(comment.user == req.user.id || comment.post.user == req.user.id){
           
            let postId= comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{commnets:req.params.id}},(err,post)=>{

                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}


