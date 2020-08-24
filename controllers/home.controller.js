const Post = require('../models/post');
const Comment = require('../models/comment');
const moment = require('moment');
const User = require('../models/user');

//function for home page
module.exports.home=function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec((err,post)=>{
        if(err){
            req.flash('error_message',"Error Post Not Found");
            console.log('post not found');
            return;
        }
        User.find({},(err,user)=>{
            if(err){
                console.log('User List not found');
                return;
            }
            return res.render('home.ejs',{
                title:'Codeial | Home',
                post_list:post,
                all_user:user,
                moment:moment
            })
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



















