const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const statsRouter = require('./routes/stats');

// In-memory storage for stats (replace with a database later)
const userStats = {};

// Update user stats
router.post('/update', (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) return res.status(400).send('User not identified');

  const { isWin, timeTaken } = req.body; // 'isWin' to track win or loss

  if (!userStats[userId]) {
    userStats[userId] = { gamesPlayed: 0, wins: 0, totalTime: 0 };
  }

  // Update games played and wins
  userStats[userId].gamesPlayed += 1;
  if (isWin) userStats[userId].wins += 1;

  // Update total time for average time calculation
  userStats[userId].totalTime += timeTaken;

  res.send('Stats updated successfully!');
});

// Fetch user stats (games played, win rate, average time)
router.get('/', (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) return res.status(400).send('User not identified');

  const stats = userStats[userId] || {};
  
  // Calculate win rate and average time
  const winRate = stats.gamesPlayed > 0 ? (stats.wins / stats.gamesPlayed) * 100 : 0;
  const averageTime = stats.gamesPlayed > 0 ? stats.totalTime / stats.gamesPlayed : 0;

  res.json({
    gamesPlayed: stats.gamesPlayed || 0,
    winRate: winRate.toFixed(2), // Win rate as a percentage with two decimal places
    averageTime: averageTime.toFixed(2) // Average time with two decimal places
  });
});

module.exports = router;
