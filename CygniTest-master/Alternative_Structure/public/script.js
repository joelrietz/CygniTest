var message = document.getElementById("message");
var button = document.getElementById("send-button");

button.addEventListener('click', () => { sendMessages(); });

function sendMessages() {
	console.log(message.value);;	
}