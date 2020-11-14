const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["exercises"];

const db = mongojs(databaseUrl, collections);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/all", (req, res) => {
    db.workout.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

// Set the app to listen on port 3000
app.listen(3000, () => {
    console.log("App running on port 3000!");
});
