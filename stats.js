const express = require('express');
const router = express.Router();

// In-memory storage for stats (replace with a database later)
const userStats = {};

// Update user stats
router.post('/update', (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) return res.status(400).send('User not identified');

  const { guesses, timeTaken } = req.body;

  if (!userStats[userId]) {
    userStats[userId] = { gamesPlayed: 0, totalGuesses: 0, totalTime: 0 };
  }

  userStats[userId].gamesPlayed += 1;
  userStats[userId].totalGuesses += guesses;
  userStats[userId].totalTime += timeTaken;

  res.send('Stats updated successfully!');
});

// Fetch user stats
router.get('/', (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) return res.status(400).send('User not identified');

  res.json(userStats[userId] || {});
});

module.exports = router;

