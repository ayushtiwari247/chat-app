var express = require('express');
var socket = require('socket.io');

var app = express();
const cors = require('cors');

app.use(cors());

var server = app.listen(8000, function(){
    console.log("Server is running at port 8000");
});

var io = socket(server);

io.on('connection', function(socket){
    console.log("socket connection made");

    socket.on('message', function(data){
        console.log("message received", data.room);
        io.in(data.room).emit('new message', {user: data.user, message: data.message});

        socket.emit('message', "Thankyou for sending message");
    });
})

