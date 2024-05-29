document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();
    if (!message) return;

    appendMessage('user', message);
    inputField.value = '';

    fetchChatbotResponse(message);
}

function appendMessage(sender, message) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

async function fetchChatbotResponse(message) {
    appendMessage('bot', 'Thinking...');

    const response = await fetch('https://gemini.googleapis.com/v1/chat:send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer AIzaSyBuYJwTEdyREChvAPxA32Y5FfmDrzxrdYo`
        },
        body: JSON.stringify({
            query: message,
            context: 'Indian politics'
        })
    });

    const data = await response.json();
    document.querySelector('.bot:last-child').textContent = data.answer || 'Sorry, I couldn\'t understand that.';
}
