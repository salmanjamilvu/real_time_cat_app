const socket = io()
let name

const textarea = document.querySelector("#textarea")
const messageArea = document.querySelector(".message__area")

do{
    name = prompt('Please enter your name: ')
}while (!name)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter' ){
        sendMessage(e.target.value)
    }
})

const sendMessage = (value) =>{
    let msg = {
        user: name,
        message: value.trim()
    }
    //Append message
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    //send message to server
    socket.emit('message', msg)
}

const appendMessage = (msg, type) =>{
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

//Received Message
socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}