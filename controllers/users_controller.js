//function for user page
module.exports.user=function(req,res){
    res.statusCode=200;
    return res.end('<h1>user profile</h1>')
};
