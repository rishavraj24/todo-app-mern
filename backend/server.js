// backend/server.js (Updated)

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// --- API Routes ---
// New: We import and use the authentication router.
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Existing: We import and use the todos router.
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});