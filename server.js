const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Example in-memory storage for stats
let stats = {
    gamesPlayed: 0,
    winRate: 0.0,
    averageTime: 0.0
};

// GET endpoint to fetch stats
app.get('/stats', (req, res) => {
    res.json(stats);
});

// POST endpoint to update stats
app.post('/stats/update', (req, res) => {
    const { isWin, timeTaken } = req.body;

    if (typeof isWin === 'boolean' && typeof timeTaken === 'number') {
        stats.gamesPlayed += 1;
        stats.averageTime = 
            ((stats.averageTime * (stats.gamesPlayed - 1)) + timeTaken) / stats.gamesPlayed;

        const wins = isWin ? 1 : 0;
        stats.winRate = ((stats.winRate * (stats.gamesPlayed - 1)) + wins) / stats.gamesPlayed * 100;

        res.send('Stats updated successfully');
    } else {
        res.status(400).send('Invalid data');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
