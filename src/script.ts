const chatBox = document.getElementById("chat-box") as HTMLDivElement;
const userInput = document.getElementById("user-input") as HTMLInputElement;
const sendBtn = document.getElementById("send-btn") as HTMLButtonElement;

window.onload=()=>{
    const savedChat=localStorage.getItem("chatHistory");
    console.log({savedChat});
    if(savedChat) chatBox.innerHTML=savedChat;
    chatBox.scrollTop=chatBox.scrollHeight;
}

function addMessage(message: string, className: string): void {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", className);
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping(): HTMLDivElement {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "bot-message");
  typingDiv.textContent = "AI is typing...";
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typingDiv;
}

async function getBotReply(message: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    const data = await response.json();
    if(!response.ok){
        console.log("API error: ",data);
        return "Error fetching response";
    }
    return data.reply;
  } catch (error) {
    return "Didn't get that";
  }
}

sendBtn.onclick = async () => {
  const message: string = userInput.value.trim();
  if (message === "") return;
  addMessage(message, "user-message");
  userInput.value = "";

  const typingDiv: HTMLDivElement = showTyping();
  const botReply: string = await getBotReply(message);
  typingDiv.remove();
  addMessage(botReply, "bot-message");

  localStorage.setItem("chatHistory", chatBox.innerHTML);
};

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
