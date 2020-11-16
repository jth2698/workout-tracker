const mongojs = require("mongojs");

const databaseUrl = "workout";
const collections = ["workouts"];
const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

module.exports = (app) => {

    // Utility AP to view all workouts in database
    app.post("/api/workouts/", (req, res) =>

        db.workouts.save({}, (error, newWorkout) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Fetched all workouts");
            }
        })
    );

    app.put("/api/workouts/:id", (req, res) => {
        if (req.body.type === "resistance") {
            db.workouts.update({
                _id: mongojs.ObjectId(req.params.id)
            }, {
                $set: {
                    exercises: [
                        {
                            type: req.body.type,
                            name: req.body.name,
                            duration: req.body.duration,
                            weight: req.body.weight,
                            reps: req.body.reps,
                            sets: req.body.sets
                        }
                    ]
                }
            })
        }
        if (req.body.type === "cardio") {
            db.workouts.update({
                _id: mongojs.ObjectId(req.params.id)
            }, {
                $set: {
                    exercises: [
                        {
                            type: req.body.type,
                            name: req.body.name,
                            duration: req.body.duration,
                            distance: req.body.distance
                        }
                    ]
                }
            })
        }
    })


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