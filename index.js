const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".container header i");
const chatInput = document.querySelector(".chat-input textarea")
const sendChatBtn = document.querySelector(".chat-input #send-btn");
const chatBox = document.querySelector(".chatbot");

let userMessage;
const inputInitHeight = chatInput.scrollHeight;
const API_KEY = "123456789";

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

const generateReponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body : JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    // Send POST request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.innerText = data.choices[0].message.content;
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.innerText = "Opps! Something went wrong. Please try again.";
    });
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
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatBox.appendChild(incomingChatLi);
        generateReponse(incomingChatLi);
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
