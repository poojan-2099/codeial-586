const Post = require('../models/post');
const Comment=require('../models/comment')

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

module.exports.destroy=(req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        if(err){
            console.log('error in finding post ');
            return;
        }
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post : req.params.id},(err)=>{
                if(err){
                    console.log('error in deleting post ');
                    return;
                }
                 return res.redirect('back');
                    
            });
        }
    });
}