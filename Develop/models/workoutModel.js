const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    totalDuration: Number,
    exercises: [{
        name: String,
        type: {
            type: String
        },
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
    }]
});


schema.pre('save', function(next) {

    this.totalDuration = Array.from(this.exercises).map(e => e.duration).reduce((a, b) => a + b);
    next();
    
});

const Workout = mongoose.model("Workout", schema);

module.exports = Workout;
