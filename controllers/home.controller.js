const Post = require('../models/post')

//function for home page
module.exports.home=function(req,res){
    Post.find({}).populate('user').exec((err,post)=>{
        if(err){
            req.flash('error_message',"Error Post Not Found");
            console.log('post not found');
            return;
        }
        return res.render('home.ejs',{
            title:'Codeial | Home',
            post_list:post
        });
    });
};
module.exports.postUser=function(req,res){
    res.statusCode=200;
    return res.redirect('/user/profile')
};


module.exports.signOut=function(req,res){
    req.logout();
    return res.redirect('/user/sign_In');
}



















