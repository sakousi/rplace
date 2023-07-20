const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const pixelData = {};

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

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
