const express = require("express");
const reviewsRouter = express.Router();
const Reviews = require("../models/reviewsModel.js");
const Trails = require("../models/trailModel.js");

reviewsRouter.get("/", (req, res, next) => {
    Reviews.find((err, reviews) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(reviews)
    })
})

reviewsRouter.post("/:trailId", (req, res, next) => {
    const newReview = new Reviews(req.body);
    newReview.trail = req.params.trailId;
    newReview.save((err, savedReview) => {
        if(err){
            res.status(500)
            return next(err)
        }
        Trails.findOneAndUpdate(
            {_id: req.params.trailId},
            {$push: { reviews: savedReview }},
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


reviewsRouter.delete("/:reviewId", (req, res, next) => {
    Reviews.findOneAndDelete({_id: req.params.reviewId}, (err, deletedReview) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send("Successfully deleted")
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
