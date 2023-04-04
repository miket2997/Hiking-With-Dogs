const express = require("express");
const usersRouter = express.Router();
const Users = require("../models/usersModel.js");
const generateAuthToken = require("../auth.js")



usersRouter.post("/signup", (req, res, next) => {
    Users.findOne({ username: req.body.username.toLowerCase() })
    .then(user => {
        if(user){
            res.status(403)
            return next(new Error("Username is already taken"))
        }
        const newUser = new Users(req.body);
        newUser.save()
        .then(savedUser => {
            const token = generateAuthToken(savedUser.withoutPassword());
            return res.status(201).send({ token, user: savedUser.withoutPassword() })
        })
        .catch(err => {
            res.status(500)
            return next(err)
        })
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })           
})          



usersRouter.post("/login", (req, res, next) => {
    Users.findOne({ username: req.body.username.toLowerCase() })
    .then(user => {
        if(!user){
            res.status(403)
            return next(new Error("Username or password is incorrect"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error("Username or password is incorrect"))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error("Username or password is incorrect"))
            }
            const token = generateAuthToken(user)
            return res.status(201).send({ token, user: user.withoutPassword() } )
        })
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
    
})

usersRouter.get("/", (req, res, next) => {
    Users.find((err, users) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})

                                                                           

                  
usersRouter.get("/:userId", (req, res, next) => {
    Users.findById({_id : req.params.userId}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})                                                                            


usersRouter.delete("/:userId", (req, res, next) => {
    Users.findOneAndDelete({_id: req.params.userId}, (err, deletedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedUser.firstName} ${deletedUser.lastName}`)
    })
})


usersRouter.put("/:userId", (req, res, next) => {
    Users.findOneAndUpdate(
        {_id: req.params.userId},
        req.body,
        {new: true},
        (err, updatedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        }
    )
});


module.exports = usersRouter

