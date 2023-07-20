// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const cors = require('cors'); // Import the cors package

const pixelData = {};

app.use(express.json()); // Parse JSON data in the request body
app.use(cors()); // Enable CORS for all routes

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('drawPixel', ({ x, y, color }) => {
    pixelData[`${x}-${y}`] = color;
    io.emit('pixelUpdated', { x, y, color });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/pixelData', (req, res) => {
  res.json(pixelData);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('Server listening on http://localhost:' + PORT);
});