const jwt = require("jsonwebtoken");
require("dotenv").config()

function generateAuthToken(user){

    const secretKey = `${process.env.SECRET}`;
    const payload = {
        user: {
            id: user._id,
            username: user.username
        },
    };
    const token = jwt.sign(payload, secretKey);
    return token
};


module.exports = generateAuthToken

