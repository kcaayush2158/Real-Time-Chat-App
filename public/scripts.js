const socket = io('http://localhost:3000');
const socket2 = io('http://localhost:3000/admin');

// socket.on('connect',()=>{
//     console.log(socket.id);
// })
socket.on('messageFromServer',(dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit('dataToServer',{data:"Data from the client"});
});

// socket.on('ping',()=>{
//       console.log('ping is recived from the server');
//   })

//   socket.on('pong',(latency)=>{
//       console.log(latency);
//       console.log('pong was sent to the server');
//   })


socket2.on('welcome',(dataFromServer)=>{
    console.log(dataFromServer);
})

socket.on('joined',(data)=>{
    console.log(data);
})

  document.querySelector('#message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log("form submitted");
    const newMessage= document.querySelector('#user-message').value
    socket.emit('newMessageToServer',{text:newMessage})
})

socket.on('messageToClient',(msg)=>{
    console.log(msg);
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li><br>`;
})