const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./routers/router');



const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

const PORT = process.env.PORT || 5554;


(async ()=>{

    try {

       await io.on('connection', (socket)=>{

           console.log('new connection');

           socket.on('join', ({name, room})=>{
               console.log(name, room);
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