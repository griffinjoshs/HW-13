const Workout = require('../models/workoutModel');


module.exports = function(app){

    // Get All Workouts
    app.get('/api/workouts', async (req, res) => {
        const docs = await Workout.find();
        res.json(docs);
    });

    // Create A new workout
    app.post('/api/workouts', async (req, res) => {
        const doc = await Workout.create(req.body);
        res.json(doc);
    });

    // Update Workout with new entry
    app.put('/api/workouts/:id', async (req, res) => {
        const doc = await Workout.findById(req.params.id);
        doc.exercises.push(req.body);
        await doc.save();
        // Aggregation takes place here in post 'save' middleware
        res.json(doc);
    });

    // Get all workouts within a date range
    app.get('/api/workouts/range', async (req, res) => {
        const docs = await Workout.find().sort({day: 'desc'}).limit(7);
        res.json(docs);
    });
}  