const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.commenting= async (req,res)=>{
    try {
     
    let post =await Post.findById(req.body.post);
      
    if(post){
        let comment =await Comment.create({
            content:req.body.comment_content,
            user:req.user._id,
            post:req.body.post
            
        });
         post.comments.push(comment);
         post.save();
         return res.redirect('back');
        };
    }

     catch (error) {
        console.log('Error !! in Creating Comment ');
        return res.redirect('back');
    }
    
}

module.exports.destroy=async (req,res)=>{
    try {
        let comment=await  Comment.findById(req.params.id).populate('post');
        if(comment.user == req.user.id || comment.post.user == req.user.id){
           
            let postId= comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId,{$pull:{commnets:req.params.id}});
            req.flash('success_message','Comment deleted successfully')
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
          
    } catch (error) {
        console.log('Error !! in Creating Comment ');
        return res.redirect('back');
    }
        
    }
  



