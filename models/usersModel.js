const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});


userModel.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next()
        user.password = hash
        next()
    })
});


userModel.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
};

userModel.methods.withoutPassword = function(){
    const user = this.toObject();
    delete user.password
    return user
};



module.exports = mongoose.model("Users", userModel)

