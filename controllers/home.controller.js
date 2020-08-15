//function for home page
module.exports.home=function(req,res){
    res.statusCode=200;
    return res.render('home.ejs',{
        title:'Home'
    })
};

//function for about page
module.exports.about=function(req,res){
    res.statusCode=200;
    return res.render('about.ejs',{
        title:'About'
    })
};