//function for home page
module.exports.home=function(req,res){
    res.statusCode=200;
    console.log(req.cookies);
    return res.render('home.ejs',{
        title:'Home'
    })
};
module.exports.postUser=function(req,res){
    res.statusCode=200;
    return res.redirect('/user/profile')
};


module.exports.signOut=function(req,res){
    req.logout();
    return res.redirect('/user/sign_In');
}



















