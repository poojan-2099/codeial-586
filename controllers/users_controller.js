const User = require('../models/user')

//function for user page profile
module.exports.userProfile =async function (req, res) {
    try {
        let user =await User.findById(req.params.id);
        
        return res.render('user_profile.ejs', {
            title: ' User Profile',
            profile_user:user
        });
    } catch (error) {
        console.log('error in finding user in profile user'); 
        return res.redirect('back');
    }
    
};

//function for user sign up page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    res.statusCode = 200;
    return res.render('user_sign_up.ejs', {
        title: 'Codeial | Sign Up'
    });
};

//function for user sign in page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    res.statusCode = 200;
    return res.render('user_sign_in.ejs', {
        title: 'Codeial | Sign In'
    });
};

//function for user sign in page
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash(`error`,`password Doesn't match please try again`);
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { 
                    console.log('Error in creating user while signing up'); 
                    return }
                    
                req.flash('success_message','Register Successfully ! Login here');
                return res.redirect('/user/sign_In');
            })
        } else {
            return res.redirect('back');
        }

    });
}

//function for user sign in page
module.exports.loginUser = function (req, res) {  
    return res.redirect('/');
};

// module.exports.signOut=function(req,res){
//     req.logout();
//     return res.redirect('/user/sign_In');
// }

module.exports.update=(req,res)=>{
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
            return res.redirect('back')
        });
    }else{
        return res.status(401).send('Unauthorized')
    }
}