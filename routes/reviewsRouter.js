const express = require("express");
const reviewsRouter = express.Router();
const Reviews = require("../models/reviewsModel.js");
const Trails = require("../models/trailModel.js");
const Users = require("../models/usersModel.js");
const { expressjwt } = require("express-jwt");

reviewsRouter.get("/", (req, res, next) => {
    Reviews.find((err, reviews) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(reviews)
    })
})

reviewsRouter.post("/:trailId", expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), (req, res, next) => {
    console.log(req.auth.user)
    const userId = req.auth.user.id;
    req.body.user = userId
    req.body.trail = req.params.trailId
    const newReview = new Reviews(req.body);
    newReview.save()
    .then(savedReview => {
        return Users.findOneAndUpdate(
            { _id: userId },
            { $push: { reviews: savedReview._id } },
            { new: true }
        )
        .then(() => {
            return Trails.findOneAndUpdate(
                { _id: req.params.trailId },
                { $push: { reviews: savedReview._id } },
                { new: true }
            )
            .then(() => {
                return res.status(201).send(savedReview)
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
    .catch(err => {
        res.status(500)
        return next(err)
    })
})


reviewsRouter.get("/:reviewId", (req, res, next) => {
    Reviews.findById({_id : req.params.reviewId}, (err, review) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(review)
    })
})


reviewsRouter.delete("/:reviewId", expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] } ), (req, res, next) => {
    Reviews.findOneAndDelete({_id: req.params.reviewId}, (err, deletedReview) => {
        if(err){
            res.status(500)
            return next(err)
        }
        const userId = deletedReview.user;
        const trailId = deletedReview.trail;

        Users.findOneAndUpdate(
            { _id: userId },
            { $pull: { reviews: req.params.reviewId } },
            { new: true}
        ).exec((err, updatedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            Trails.findOneAndUpdate(
                { _id: trailId },
                { $pull: { reviews: req.params.reviewId } },
                { new: true }
            ).exec((err, updatedTrail) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send("Successfully deleted")
            })
        })
    })
})


reviewsRouter.put("/:reviewId", (req, res, next) => {
    Reviews.findOneAndUpdate(
        {_id: req.params.reviewId},
        req.body,
        {new: true},
        (err, updatedReview) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedReview)
        }
    )
})




module.exports = reviewsRouter
