const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    text : {
        type: String,
        required: true
    },
    trail: {
        type: Schema.Types.ObjectId,
        ref: "Trails",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});


module.exports = mongoose.model("Reviews", reviewSchema)
