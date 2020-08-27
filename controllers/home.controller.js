const Post = require('../models/post');
const Comment = require('../models/comment');
const moment = require('moment');
const User = require('../models/user');


//function for home page
module.exports.home= async function(req,res){
    try{
        let post =await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        
        let user = await User.find({});
    
        return res.render('home.ejs',{
            title:'Codeial | Home',
            post_list:post,
            all_user:user,
            moment:moment
        });
    }catch(error){
        req.flash('error',"Error Post Not Found");
        console.log('post not found');
        return res.redirect('back');
           
    }

};




// //function for home page
// module.exports.home=function(req,res){
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec((err,post)=>{
//         if(err){
//             req.flash('error',"Error Post Not Found");
//             console.log('post not found');
//             return;
//         }
//         User.find({},(err,user)=>{
//             if(err){
//                 console.log('User List not found');
//                 return;
//             }
//             return res.render('home.ejs',{
//                 title:'Codeial | Home',
//                 post_list:post,
//                 all_user:user,
//                 moment:moment
//             })
//         });
//     });
// };



module.exports.postUser=function(req,res){
    res.statusCode=200;
    return res.redirect('/user/profile')
};


module.exports.signOut=function(req,res){
    req.logout();
    req.flash('success_message',"Sign Out Successfully");
    return res.redirect('/user/sign_In');
}



















