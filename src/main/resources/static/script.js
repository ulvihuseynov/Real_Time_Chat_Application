
function setConnected(connected){
    document.getElementById("sendMessage").disabled=!connected;
}

function connect(){

    const socket=new SockJS("/chat")
    stompClient=Stomp.over(socket);
    stompClient.connect({},frame=>{
        setConnected(true)
        stompClient.subscribe("/topic/messages",message=>{
            showMessage(JSON.parse(message.body))
        });
    })
}
function showMessage(message){
    const chat=document.getElementById("chat");
    const messageElement=document.createElement("div");
    messageElement.textContent=message.sender + ' : ' + message.content;
    messageElement.className="border-bottom mb-1";
    chat.appendChild(messageElement);
    chat.scrollTop=chat.scrollHeight;
}

function sendMessage() {

    const sender=document.getElementById("senderInput").value;
    const content=document.getElementById("messageInput").value;

    const chatMessage={
        sender:sender,content:content
    }
    stompClient.send("/app/sendMessage",{},JSON.stringify(chatMessage))
    document.getElementById("messageInput").value="";
}
document.getElementById("sendMessage").onclick=sendMessage;
window.onload=connect;