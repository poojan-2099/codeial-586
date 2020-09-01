const Post = require('../models/post');
const Comment=require('../models/comment')
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.posting=async (req,res)=>{
    try {
     
  
        let post= await Post.create({
            content:req.body.post_content,
            user:req.user._id,
           
        })
        Post.uploadedPostImg(req,res,(err)=>{ 
            if (err) { 
                req.flash('error','upload file under 2024kb ')
                console.log('Error in post upload',err); 
            return}
            if (req.file) {
                console.log(req.file)
               //this is saving a path of uploaded file into the avatar field in the user
               post.post_img = Post.postPath+'/'+req.file.filename;
               
           }
        })
        let user= await User.findById(req.user._id);
        user.posts.push(post);
        user.save();
        if(req.xhr){
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data:{
                    post:post,     
                },
                message:"Post created !"
            });
        }            
            req.flash('success_message','Posted Successfully');
            return res.redirect('back');
       
    } catch (error) {
            req.flash('error','there is an error in posting')
            return res.redirect('back');
      
    }
  
}

module.exports.destroy=async (req,res)=>{
    try {
        let post=await   Post.findById(req.params.id);
            if(post.user == req.user.id){
                let userId= post.user;
                post.remove();
                await Comment.deleteMany({post : req.params.id});
                    if(req.xhr){
                let user = await User.findByIdAndUpdate(userId,{$pull:{posts:req.params.id}});

                        return res.status(200).json({
                            data:{
                                post_id: req.params.id 
                            },
                            message:"Post delted !"
                        });
                    }     
            req.flash('success_message','Deleted Successfully');
            return res.redirect('back');
        }
        } catch (error) {
            req.flash('error','there is an error in posting')
            return res.redirect('back');
        }

}