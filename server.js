const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();



app.use(express.json());
app.use(morgan('dev'));



app.use("/trails", require("./routes/trailsRouter.js"));
app.use("/reviews", require("./routes/reviewsRouter.js"));
app.use("/auth", require("./routes/authRouter.js"))


mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.wawrkog.mongodb.net/dogHiking?retryWrites=true&w=majority`, () => console.log("Connected to DB"));

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})


app.listen(5001, () => {
    console.log("App is running on port 5000")
})

