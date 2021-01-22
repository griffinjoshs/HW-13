const Workout = require('../models/workoutModel')

exports.create = async (req, res) => {
    //   * Add new exercises to a new workout plan.
    const data = await Workout.create(req.body);
    res.json({
        status: "success",
        data
    })
};

exports.update = (req, res) => {
    //   * Add new exercises to a new workout plan.
    const workoutData = await Workout.findByID(req.params.id)
    workoutData.exercises.push(req.body)
    await workoutData.save();
    res.json({
        status: "success",
        data: workoutData
    })
}

exports.getWeightStats = (req, res) => {
    //   * Add new exercises to a new workout plan.
    const docs = await Workout.find({
        day: {
            $gte: Date.now() - (7 * 24 * 60 * 60 * 1000)
        }
    });
    const weight = docs.map((w) => w.exercises.map((e) => e.weight).reduce(((a, b) => a + b))).reduce((a, b) => a + b);
    res.json({
        status: "success",
        data: weight
    })
}

exports.getDurationStats = (req, res) => {
    //   * Add new exercises to a new workout plan.
      //   * Add new exercises to a new workout plan.
      const docs = await Workout.find({
        day: {
            $gte: Date.now() - (7 * 24 * 60 * 60 * 1000)
        }
    });
    const duration = docs.map((w) => w.exercises.map((e) => e.duration).reduce(((a, b) => a + b))).reduce((a, b) => a + b);
    res.json({
        status: "success",
        data: duration
    })
} 