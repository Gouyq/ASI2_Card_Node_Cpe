const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;

app.get('/client1', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

app.get('/client2', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});


server.listen(port, () =>{
    console.log(`Now listing on ${port}`)
});


io.on('connection', (socket) => {
    console.log('a user connected');
});