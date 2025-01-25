const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const statsRouter = require('./routes/stats');

// Middleware
app.use(express.json());
app.use(cookieParser());

// Use the stats route
app.use('/stats', statsRouter);

// Serve static files (your HTML, CSS, etc.)
app.use(express.static('public')); // Make sure the directory for your static files is correct

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
