const express = require("express");
const usersRouter = express.Router();
const Users = require("../models/usersModel.js");
const generateAuthToken = require("../auth.js")


usersRouter.get("/", (req, res, next) => {
    Users.find((err, users) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})

usersRouter.post("/", (req, res, next) => {
    const newUser = new Users(req.body);
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }                                                                                       
        return res.status(201).send(savedUser)
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


usersRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ email }, (err, user) => {
        if(err){
            return res.status(500).json({error: "Internal Server error"})
        }
        if(!user || user.password !== password) {
            return res.status(401).json({error: "Invalid login credentials"})
        }

        const token = generateAuthToken(user);
        res.json({ user, token });
    })
})


module.exports = usersRouter

