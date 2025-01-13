const express = require('express');
const cookieParser = require('cookie-parser');
const statsRoutes = require('./routes/stats');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/stats', statsRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
