const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");

const app = express();

const databaseUrl = "workout";
const collections = ["workouts"];
const db = mongojs(databaseUrl, collections);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/all", (req, res) => {
    db.workouts.find({}, (err, data) => {
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
