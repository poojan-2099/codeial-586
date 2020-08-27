const Post = require('../models/post');
const Comment=require('../models/comment')

module.exports.posting=async (req,res)=>{
    try {
       let post=await Post.create({
            content:req.body.post_content,
            user:req.user._id
        });
        if(req.xhr){
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
                post.remove();
                await Comment.deleteMany({post : req.params.id});
                    if(req.xhr){
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