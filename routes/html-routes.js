const path = require("path");

module.exports = (app) => {

    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    app.get("/all", (req, res) => {
        db.workouts.find({}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
    })
}