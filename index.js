const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".container header i");
const chatInput = document.querySelector(".chat-input textarea")
const sendChatBtn = document.querySelector(".chat-input #send-btn");
const chatBox = document.querySelector(".chatbot");

let userMessage;
const inputInitHeight = chatInput.scrollHeight;

// create a chat <li> element with passed message and className
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatLiContent = className === "outgoing" ? `<p></p>` :
                                                   `<i id="chatbot-avt" class="fa-solid fa-robot"></i>
                                                    <p></p>`;
    chatLi.innerHTML = chatLiContent;
    chatLi.querySelector("p").innerText = message;
    return chatLi;
}

const generateReponse = () => {

}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    // If the message is blank, then do nothing
    if (!userMessage) {
        return;
    }

    // Append the userMessage to the chatBox and reset the chatInput to blank with initial height
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);

    setTimeout(() => {
        chatBox.appendChild(createChatLi("Thinking...", "incoming"));
        generateReponse();
        chatBox.scrollTo(0, chatBox.scrollHeight);
    }, 500);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
})

// If "Enter" key is pressed without "Shift" key and window width is greater than 800px, then handle the chat
chatInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && !event.shiftKey && window.innerWidth > 800) {
        event.preventDefault();
        handleChat();
    } 
})

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);