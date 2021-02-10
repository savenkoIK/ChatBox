var messages = document.getElementById("messages");
var sendButton = document.getElementById("send-btn");
sendButton.addEventListener("click",sendUserMessage);
start();

function start() {
  getMessagesFromServer()
  setInterval(getMessagesFromServer,2000);
}
var lastMessages = [];

async function getMessagesFromServer()
{
  var response = await fetch("https://fchatiavi.herokuapp.com/get/ilya/?offset=0&limit=1000000");
  response = await response.json();
  var messagesHTML = fromMessagesHTML(response);
  messages.innerHTML = messagesHTML;
  if (lastMessages.length < response.length)
  {
    scrollToEnd();
  }
}
async function sendUserMessage()
{
    var userNickname = document.getElementById("nickname-input").value;
    var userMessage = document.getElementById("message-input").value;
    if(userNickname.length === 0)
    {
      alert("Ты должен ввести имя!");
      return;
    }
    if(userMessage.length === 0)
    {
      alert("Ты должен ввести сообщение!");
      return;
    }

    await fetch("https://fchatiavi.herokuapp.com/send/ilya/",{
      method: "POST",
      body: JSON.stringify({
        Name: userNickname,
        Message: userMessage
      })
    });
    getMessagesFromServer();
    scrollToEnd();
}

function fromMessagesHTML(messages) {
  var allMessagesHTML = "";
  for(var i = 0; i < messages.length; i++)
  {
    var messageData = messages[i];
    var message = `<div class="message">
      <div class="message-name">${messageData.Name} </div><div class="message-text">${messageData.Message}</div></div>`
      allMessagesHTML = allMessagesHTML + message;

  }
  return allMessagesHTML;
}

function scrollToEnd() {
  messages.scrollTop = messages.scrollHeight;
}
