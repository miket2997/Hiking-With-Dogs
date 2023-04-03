const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");



app.use(express.json());
app.use(morgan('dev'));



app.use("/api/trails", require("./routes/trailsRouter.js"));
app.use("/api/reviews", require("./routes/reviewsRouter.js"))
app.use("/api/users", require("./routes/usersRouter.js"))


mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://miket2997:Xq3xuYIBnZGXPiv0@cluster0.wawrkog.mongodb.net/dogHiking?retryWrites=true&w=majority", () => console.log("Connected to DB"));

app.use((req, res, err, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})


app.listen(5000, () => {
    console.log("App is running on port 5000")
})