const jwt = require("jsonwebtoken");

function generateAuthToken(user){

    const secretKey = "secretkey";
    const payload = {
        user: {
            id: user._id,
            email: user.email,
            password: user.password
        },
    };
    const token = jwt.sign(payload, secretKey);

    console.log(token)
    return token
};


module.exports = generateAuthToken

