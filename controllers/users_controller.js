const User = require('../models/user')

//function for user page profile
module.exports.userProfile = function (req, res) {
    console.log(req.cookies.user_id);
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id , (err, user) => {
            if (err) { console.log('error in creating user while signing up'); return }
            if (user) {
                return res.render('user_profile.ejs', {
                    title: 'Profile',
                    user:user
                });
            } else {
                return res.redirect('/user/sign_In');

            }
        });
    } else {
        return res.redirect('/user/sign_In');

    }

};

//function for user sign up page
module.exports.signUp = function (req, res) {
    res.statusCode = 200;
    return res.render('user_sign_up.ejs', {
        title: 'Codeial | Sign Up'
    });
};

//function for user sign in page
module.exports.signIn = function (req, res) {
    res.statusCode = 200;
    return res.render('user_sign_in.ejs', {
        title: 'Codeial | Sign In'
    });
};

//function for user sign in page
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/user/sign_In');
            })
        } else {
            return res.redirect('back');
        }
    });
}

//function for user sign in page
module.exports.loginUser = function (req, res) {
    //steps for sign in

    // find user id
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log('error in finding user in signing In'); return }
        //hendle user found
        if (user) {
            //check password
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            //hendle session choockie
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        } else {
            //hendle user not found
            return res.redirect('back');
        }
    });

}


//function for sign out
module.exports.signOut=function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/user/sign_In');
}