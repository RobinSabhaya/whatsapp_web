const socket = io();
const btn = document.getElementById("btn");
const Message = document.getElementById("Message");
const Container = document.getElementById("Container");
let name;
do {
  name = prompt("Enter your name");
} while (!name);

btn.addEventListener("click", () => {
  if(Message.value){
    const msg = {
        name: name,
        message: Message.value,
      };
      sendMessage(msg);
      socket.emit("message", msg);
  }
  else{
    Message.value = "Do not send empty message!!!"
  }

});
function sendMessage(msg) {
  appendData(msg, "incoming");
}
function appendData(msg, type) {
  const message = document.createElement("div");
  message.classList.add(type);
  message.innerHTML = `
        <div>
            <h4>${msg.name}:</h4>
            ${msg.message}
        </div>
        `;
  Message.value = "";
  Container.appendChild(message);
}

socket.on("message", (msg) => {
  appendData(msg, "outgoing");
});
