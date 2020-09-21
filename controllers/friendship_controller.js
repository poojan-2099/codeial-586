const User = require('../models/user');
const Friendship = require('../models/friendship');
const PADFr= require('../models/padding_friend');
module.exports.toggle_friendship = (req, res) =>
{
    let from_id = req.user._id;
    let to_id = req.params.id;
    Friendship.findOne({ $or: [{ from_user: from_id, to_user: to_id }, { from_user: to_id, to_user: from_id }] },
        function (error, existing_friendship)
        {
            console.log('**********************************', existing_friendship);
            if (error)
            {
                console.log('There was an error in finding the friendship between the users');
            }
            if (existing_friendship)
            {
                /* updating users database */
                User.findByIdAndUpdate(from_id, { $pull: { friendships: existing_friendship._id } }, function (error, data)
                {
                    if (error)
                    {
                        console.log('Error in removing the friendship from the user', error);
                        return;
                    }
                    console.log(data);
                });
                User.findByIdAndUpdate(to_id, { $pull: { friendships: existing_friendship._id } }, function (error, data)
                {
                    if (error)
                    {
                        console.log('Error in removing the friendship from the user', error);
                        return;
                    }
                });

                /* updating friendships database */
                Friendship.deleteOne({$or:[{ from_user: from_id, to_user: to_id }, { from_user: to_id, to_user: from_id }]}, function (error)
                {
                    if (error)
                    {
                        console.log('Unable to remove friendship', error);
                        return;
                    }
                    console.log('Deleted Friendship!');
                });
            }
            else
            {
                /* updating friendships database */
                Friendship.create({ from_user: from_id, to_user: to_id }, function (error, new_friendship)
                {
                    if (error)
                    {
                        console.log('There was an error in creating a friendship!', error);
                    }
                    new_friendship.save();
                    /* updating users database */
                    User.findByIdAndUpdate(from_id, { $push: { friendships: new_friendship._id } }, function (error, data)
                    {
                        if (error)
                        {
                            console.log('Error in adding the friendship to the user database', error);
                            return;
                        }
                        console.log(data);
                    });
                    User.findByIdAndUpdate(to_id, { $push: { friendships: new_friendship._id } }, function (error, data)
                    {
                        if (error)
                        {
                            console.log('Error in adding the friendship to the user database', error);
                            return;
                        }
                        console.log(data);
                    });
                    if(req.query.pid != null ){
                        PADFr.findById(req.query.pid,function(error,userreq){
                       if(error){
                           return;
                       }
                       userreq.remove();
                       User.findByIdAndUpdate(req.user._id,{$pull:{padFriend:req.query.pid}})
                        });
                   }
                });
            }
            return res.redirect('back');
        });
}
module.exports.padding_friend=async function(req,res){
    try {
      
           let adduser=await  PADFr.create({
            user:req.user._id
           })
            let main_user = await User.findById(req.params.id);
            // console.log(adduser.id);
            main_user.padFriend.push(adduser);
            main_user.save();
        return res.redirect('back');
    } catch (error) {
        console.log('Error in adding the friendship to the user database', error);
        return;
    }
    
}
module.exports.cancel_friend=async function(req,res){
    try {
       
        let userId=await req.user._id
        let userreq =await  PADFr.findById(req.params.id);
        userreq.remove();
        User.findByIdAndUpdate(userId,{$pull:{padFriend: req.params.id}})
        return res.redirect('back');
    } catch (error) {
        console.log('Error in adding the friendship to the user database', error);
        return;
    }
    
}