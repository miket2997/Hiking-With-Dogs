const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
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
    },
    birthDate: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    }
});



module.exports = mongoose.model("Users", userModel)

