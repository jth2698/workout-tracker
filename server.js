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

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

db.on("error", error => {
    console.log("Database Error:", error);
});

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);
    db.workouts.save(req.body);
})

// Set the app to listen on port 3000
app.listen(3000, () => {
    console.log("App running on port 3000!");
});
