const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    //Generate messages from the server when a new user joins a room
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat'));

    //Accepts a message from a user, adds a timestamp and shares with chat room
    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();
    });

    //Accepts geolocation message and shares with chat room
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
});