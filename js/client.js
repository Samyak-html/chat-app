const socket = io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageINP');
const messageContainer=document.querySelector(".container");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right')
    socket.emit('send',message);
    messageInput.value='';
} )

const append = (message,postion)=>{
    const messageElement=document.createElement("div"); 
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add([postion]); 
    messageContainer.append(messageElement);
}

const username= prompt("Enter Your Name");
socket.emit('new-user-joined',username);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message} `,'left');
})
socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})
