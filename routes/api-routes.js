//requiring the models folder with the Workout model
const db = require("../models");

//exporting the api routes as an arrow function
module.exports = (app) => {
    //@route    GET /api/workouts
    //@desc     get all workouts
    //@access   Public
    app.get("/api/workouts", (req, res) => {
        //find all workouts
        db.Workout.find({})
            //return as json
            .then((workout) => {
                res.json(workout);
            })
            .catch((err) => res.json(err));
    });

    //@route    POST /api/workouts
    //@desc     create new workout
    //@access   Public
    app.post("/api/workouts", (req, res) => {
        //create new exercise in a workout
        db.Workout.create({})
            //return as json
            .then((newWorkout) => {
                res.json(newWorkout);
            })
            .catch((err) => res.json(err));
    });

    //@route    PUT /api/workouts/:id
    //@desc     update existing workout
    //@access   Public
    app.put("/api/workouts/:id", ({ params, body }, res) => {
        //find by id and update
        db.Workout.findByIdAndUpdate(
            //giving the _id for mongo from the params passed in through the URL
            { _id: params.id },
            //mongo command to push an exercise onto the workout
            { $push: { exercises: body } }
        )
            //promise to return the updated workout as json
            .then((updatedWorkout) => {
                res.json(updatedWorkout);
            })
            .catch((err) => res.json(err));
    });

    //@route    GET /api/workouts/range
    //@desc     update existing workout
    //@access   Public
    app.get("/api/workouts/range", (req, res) => {
        //find all workouts from mongo to display in workout dashboard
        db.Workout.find({})
            //return as JSON
            .then((workout) => {
                res.json(workout);
            })
            .catch((err) => res.json(err));
    });

    //@route    PUT /api/workouts/:id
    //@desc     update existing workout
    //@access   Public
    app.post("/api/workouts/range", (req, res) => {
        db.Workout.create({})
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
    });
};