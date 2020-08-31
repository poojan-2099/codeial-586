const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PATH= path.join('/upload/post/postimg');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
       
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include the id of all commnets in this post schema as array of aobject
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    postimg:{
        type:String
    }

    
    
}, {
    timestamps: true
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',POST_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});

//static function for multer

postSchema.statics.uploadedPostImg = multer({ storage: storage }).single('postimg');
postSchema.statics.postPath=POST_PATH;

const Post = mongoose.model('Post', postSchema);

module.exports = Post;