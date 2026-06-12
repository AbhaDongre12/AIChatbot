"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
window.onload = () => {
    const savedChat = localStorage.getItem("chatHistory");
    console.log({ savedChat });
    if (savedChat)
        chatBox.innerHTML = savedChat;
    chatBox.scrollTop = chatBox.scrollHeight;
};
function addMessage(message, className) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot-message");
    typingDiv.textContent = "AI is typing...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
}
function getBotReply(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                }),
            });
            const data = yield response.json();
            if (!response.ok) {
                console.log("API error: ", data);
                return "Error fetching response";
            }
            return data.reply;
        }
        catch (error) {
            return "Didn't get that";
        }
    });
}
sendBtn.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    const message = userInput.value.trim();
    if (message === "")
        return;
    addMessage(message, "user-message");
    userInput.value = "";
    const typingDiv = showTyping();
    const botReply = yield getBotReply(message);
    typingDiv.remove();
    addMessage(botReply, "bot-message");
    localStorage.setItem("chatHistory", chatBox.innerHTML);
});
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
        sendBtn.click();
});
//# sourceMappingURL=script.js.map