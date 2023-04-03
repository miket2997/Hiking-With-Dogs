const express = require("express");
const trailsRouter = express.Router();
const Trails = require("../models/trailModel.js");

trailsRouter.get("/", (req, res, next) => {
    Trails.find((err, trails) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(trails)
    })
})

trailsRouter.post("/", (req, res, next) => {
    const newTrail = new Trails(req.body);
    newTrail.save((err, savedTrail) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedTrail)
    })
})


trailsRouter.get("/:trailId", (req, res, next) => {
    Trails.findById({_id : req.params.trailId}, (err, trail) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(trail)
    })
});


trailsRouter.get("/:trailId/reviews", (req, res, next) => {
    Trails.findById({_id: req.params.trailId}, (err, reviews) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(reviews)
    })
    .populate('reviews')
})


trailsRouter.delete("/:trailId", (req, res, next) => {
    Trails.findOneAndDelete({_id: req.params.trailId}, (err, deletedTrail) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Succesfully deleted ${deletedTrail.name}`)
    })
})


trailsRouter.put("/:trailId", (req, res, next) => {
    Trails.findByIdAndUpdate(
        {_id: req.params.trailId},
        req.body,
        {new: true},
        (err, updatedTrail) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedTrail)
        }
    )
})
    

module.exports = trailsRouter

