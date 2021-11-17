const express = require('express');
const Chat = require('./service/Chat');
const UserService = require('./service/UserService');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 8080;
let users = [];

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

server.listen(port, () =>{
    console.log(`Now listing on ${port}`)
    /*var users = UserService.getUsers();
    console.log(users);*/
});


io.on('connection', (socket) => {
    //console.log('a user connected');
    console.log(socket.id)
    users.push({id : socket.id})
    
    //socket.emit('message', 'Welcome user')
    io.emit('getUser', users)

    //socket.broadcast.emit('message', 'a user has joined the chat')

    socket.on('disconnect', () => {
        users = users.filter(user => user.id !== socket.id)
        io.emit('getUser', users)
        //io.emit('message', 'a user has left the chat')
    })

    socket.on('message', (result) => {
        console.log(users)
        var data = JSON.parse(result);
        if(data.id !== "all"){
            io.to(data.id).emit('message', data.message)
            socket.emit('message', data.message)
        }
        else{
            console.log(data)
            io.emit('message', data.message)
        }
    })
});

// class salon
// fonction on et emit + nameSalon
// creation dans on lobby
// stockage des différents salons
// Possibilité de rejoindre un salon


/*var lobby = new Chat('lobby', socket, io);
    var cb = (msg)=>{
        var salon = new Chat(msg.salon, socket, io)
        salon.listen(salon.emit)
    }

    lobby.listen(cb)*/
    /*
    socket.on('createChat', (msg) => {
        (msg) => {
            socket.on(msg., (msg) => {
                io.emit('salon1', msg);
        }
    
        console.log('message: ' + msg);
    });*/
    /*
    socket.on('message', (msg) => {
        //var content = JSON.parse(msg);
        io.emit('message', msg);
        console.log('message: ' + msg);
    });*/
