const express = require('express');
const cookieParser = require('cookie-parser');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/stats', statsRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });