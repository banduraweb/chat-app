const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./routers/router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

const PORT = process.env.PORT || 5554;


(async ()=>{

    try {

       await io.on('connection', (socket)=>{

           console.log('new connection');

           socket.on('join', ({name, room}, next)=>{
               console.log(name, room);

               const { error, user } = addUser({ id: socket.id, name, room });

               if(error) return next(error);

               socket.join(user.room);

               socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});

               socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

               io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

               next();
           });


           socket.on('sendMessage', (message, next) => {
               const user = getUser(socket.id);

               io.to(user.room).emit('message', { user: user.name, text: message });

               next();
           });


           socket.on('disconnect', ()=>{
               console.log('user had left!');
           })
       });


        server.listen(PORT, () => {
            console.log(`Started..on.port.${PORT}`);
        });
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }

})();