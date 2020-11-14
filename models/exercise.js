const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    duration: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    }
});

const Exercise = mongoose.model("Transaction", transactionSchema);

module.exports = Exercise;