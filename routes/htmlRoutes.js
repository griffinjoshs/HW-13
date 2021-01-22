const path = require("path");

module.exports = function (app) {
    // INDEX HTML
    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, '../public/stats.html')));
}