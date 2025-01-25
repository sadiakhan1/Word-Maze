const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');  // For serving static files
const app = express();
const statsRouter = require('./routes/stats'); // Import the stats.js file

// Middleware to parse incoming requests
app.use(express.json());  // To parse JSON request bodies
app.use(cookieParser());  // To parse cookies

// Serve static files (index.html, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use the stats route
app.use('/stats', statsRouter); 

// Example route to ensure the server is running
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
