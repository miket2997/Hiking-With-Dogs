const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const trailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Reviews"
    }]
})

module.exports = mongoose.model("Trails", trailSchema)

