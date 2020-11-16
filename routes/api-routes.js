const mongojs = require("mongojs");

const databaseUrl = "workout";
const collections = ["workouts"];
const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

module.exports = (app) => {

    // Utility AP to view all workouts in database
    app.get("/api/workouts/", (req, res) => {
        db.workouts.find({}, (error, found) => {
            if (error) {
                console.log(error);
            } else {
                res.json(found);
            }
        });
    });

    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.body);
        db.workouts.save(req.body);
    });

    app.get("/api/workouts/range", (req, res) => {
        db.workouts.find({}, (error, found) => {
            if (error) {
                console.log(error);
            } else {
                res.json(found);
            }
        });
    });
}