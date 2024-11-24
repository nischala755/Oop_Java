// Chatbot application logic
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendMessageButton = document.getElementById('sendMessage');
    const goBackDashboardButton = document.getElementById('goBackDashboard');
    
    // Add typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    
    // Message history
    let messageHistory = [];
    
    // Handle sending messages
    const handleSendMessage = async () => {
        const input = userInput.value.trim();
        if (input) {
            // Add user message
            addChatMessage(input, true);
            messageHistory.push({ role: 'user', content: input });
            
            // Clear input and disable
            userInput.value = '';
            userInput.disabled = true;
            sendMessageButton.disabled = true;
            
            // Show typing indicator
            chatBox.appendChild(typingIndicator);
            scrollToBottom();
            
            // Simulate AI processing time
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Get and add bot response
            const response = await getBotResponse(input);
            typingIndicator.remove();
            addChatMessage(response, false);
            messageHistory.push({ role: 'assistant', content: response });
            
            // Re-enable input
            userInput.disabled = false;
            sendMessageButton.disabled = false;
            userInput.focus();
        }
    };
    
    // Event listeners
    sendMessageButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    goBackDashboardButton.addEventListener('click', () => {
        if (messageHistory.length > 0) {
            if (confirm('Are you sure you want to leave? Your chat history will be lost.')) {
                window.location.href = 'dashboard.html';
            }
        } else {
            window.location.href = 'dashboard.html';
        }
    });
    
    // Function to add chat messages
    function addChatMessage(message, isUser) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `message-container ${isUser ? 'user' : 'bot'}`;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = formatMessage(message);
        
        const timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.textContent = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageContainer.appendChild(messageElement);
        messageContainer.appendChild(timestamp);
        chatBox.appendChild(messageContainer);
        
        scrollToBottom();
    }
    
    // Format message with markdown-like syntax
    function formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    // Enhanced bot responses with context awareness
    async function getBotResponse(input) {
        const lowercaseInput = input.toLowerCase();
        
        // Enhanced response system
        const responses = {
            greeting: {
                patterns: ['hello', 'hi', 'hey', 'greetings'],
                responses: [
                    'Hello! How can I assist you today?',
                    'Hi there! What can I help you with?',
                    'Hey! Ready to help you out!'
                ]
            },
            expense: {
                patterns: ['expense', 'spending', 'cost', 'budget'],
                responses: [
                    'You can view and manage your expenses in the Dashboard. Would you like me to show you how?',
                    'Your expense tracking is available in the Dashboard. Need help navigating there?',
                    'I can help you manage your expenses. What specifically would you like to know?'
                ]
            },
            payment: {
                patterns: ['payment', 'metamask', 'wallet', 'connect'],
                responses: [
                    'You can connect to MetaMask in the Payments page. Would you like a step-by-step guide?',
                    'To handle payments, you\'ll need to connect your MetaMask wallet. Shall I show you how?',
                    'I can help you set up your payment methods. Would you like to proceed?'
                ]
            },
            farewell: {
                patterns: ['bye', 'goodbye', 'see you', 'later'],
                responses: [
                    'Goodbye! Don\'t hesitate to return if you need anything else.',
                    'Have a great day! Let me know if you need further assistance.',
                    'Bye! Thanks for chatting!'
                ]
            }
        };
        
        // Find matching category
        for (const [category, data] of Object.entries(responses)) {
            if (data.patterns.some(pattern => lowercaseInput.includes(pattern))) {
                return data.responses[Math.floor(Math.random() * data.responses.length)];
            }
        }
        
        // Default response with conversation continuity
        return "I'm not quite sure about that. Could you please rephrase or provide more details about what you're looking for?";
    }
    
    // Initial greeting
    setTimeout(() => {
        addChatMessage("👋 Welcome! How can I help you today?", false);
    }, 500);
});