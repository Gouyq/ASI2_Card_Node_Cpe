const express = require('express');
const { copyFile } = require('fs');
const { UserChat } = require('./model/UserChat');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
});

const port = 8080;

let users = [];

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

server.listen(port, () =>{
    console.log(`Now listing on ${port}`)
});


io.on('connection', (socket, id) => {
    console.log(socket.id)
    
    //io.to(socket.id).emit('connected')
    socket.on('updateUser', (data) => {
        let user = new UserChat(data.id, data.surName, data.lastName, socket.id);
        users.push(user);
        console.log(users);
        console.log(users.filter(user => user.socketId !== socket.id));
        io.emit('getUsers', users)
    });
    

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
        io.emit('getUser', users)
    })

    socket.on('message', (result) => {
        console.log(users)
        var data = JSON.parse(result);
        console.log(data)
        if(data.receiverId !== "all"){
            const user = users.find(user => user.id === data.receiverId)
            console.log(user)
            io.to(user.socketId).emit('message', data)
            socket.emit('message', data)
        }
        else{
            console.log(data)
            io.emit('message', data.message)
        }
    })
});