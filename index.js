const
    express= require('express'),
    app = express(),
    socketio = require('socket.io'),
    expressServer = app.listen(3000),
    io = socketio(expressServer);

app.use(express.static(__dirname+"/public"));

app.get('/',function(req,res){
   res.sendFile(__dirname+'/index.html');
})

io.on('connection',function(socket){

    socket.emit("messageFromServer",{data:'Welcome to the socket.io server'});
    socket.on('messageFromClient',(dataFromClient)=>{
        console.log(dataFromClient);
    });

    socket.on('newMessageToServer',(msg)=>{
        console.log(msg)
        io.emit('messageToClient',{text:msg.text});
    })

    socket.join('level1')
    socket.to('level1').emit('joined',`the user of ${socket.id} has joined the level1 room`);
});

io.of('/admin').on('connection',(socket)=>{
   // console.log('someone connected to the admin namespace');
    io.of('/admin').emit('welcome',"welcome to the admin channel");
})
