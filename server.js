const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//dynamic PORT variable
const PORT = process.env.PORT || 17943;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Set the app to listen on port 3000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
