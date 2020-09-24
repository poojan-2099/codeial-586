module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection',function (socket) {
        console.log('new connection is recieved ',socket.id);

        socket.on('disconnect',function(){
            console.log('connection is closed ');

        });
        
        socket.on('join_room', function(data)
        {
            console.log('joining request recieved!', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        });
        socket.on('send_message', function(data)
        {
            io.in(data.chatroom).emit('recieve_message', data);
        });
          //receiving a request for broadcasting
          socket.on('typing', function(data){
            if(data.typing==true){
                socket.broadcast.emit('display', data)
            }
            else{
                socket.broadcast.emit('display', data)
            }
        });
    })
}