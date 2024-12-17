// Enhanced Chatbot with Advanced Features
document.addEventListener('DOMContentLoaded', () => {
    // Comprehensive Chatbot Class
    class AIChatbot {
        constructor() {
            // DOM Elements
            this.elements = {
                chatBox: document.getElementById('chatBox'),
                userInput: document.getElementById('userInput'),
                sendMessageButton: document.getElementById('sendMessage'),
                goBackDashboardButton: document.getElementById('goBackDashboard'),
                voiceInputToggle: null, // Will be created dynamically
                settingsToggle: null // Will be created dynamically
            };

            // State Management
            this.state = {
                messageHistory: [],
                preferences: this.loadPreferences(),
                voiceEnabled: false,
                recognition: null
            };

            // Intent Recognition System
            this.intentRecognition = new IntentRecognizer();

            // Initialize the chatbot
            this.initialize();
        }

        // Preference Management
        loadPreferences() {
            const defaultPreferences = {
                theme: 'light',
                fontSize: 'medium',
                notifications: true,
                language: 'en'
            };

            try {
                const savedPreferences = localStorage.getItem('chatbotPreferences');
                return savedPreferences 
                    ? JSON.parse(savedPreferences) 
                    : defaultPreferences;
            } catch (error) {
                console.error('Error loading preferences:', error);
                return defaultPreferences;
            }
        }

        savePreferences(newPreferences) {
            try {
                this.state.preferences = { ...this.state.preferences, ...newPreferences };
                localStorage.setItem('chatbotPreferences', JSON.stringify(this.state.preferences));
                this.applyPreferences();
            } catch (error) {
                console.error('Error saving preferences:', error);
            }
        }

        applyPreferences() {
            const { theme, fontSize, notifications } = this.state.preferences;

            // Theme application
            document.body.classList.toggle('dark-theme', theme === 'dark');

            // Font size application
            const fontSizeMap = {
                small: 'text-sm',
                medium: 'text-base',
                large: 'text-lg'
            };
            this.elements.chatBox.className = fontSizeMap[fontSize] || 'text-base';

            // Notification preference (could be used for browser notifications)
            if (notifications && "Notification" in window) {
                Notification.requestPermission();
            }
        }

        // Voice Input Setup
        setupVoiceInput() {
            if (!('webkitSpeechRecognition' in window)) {
                console.warn('Speech recognition not supported');
                return;
            }

            this.state.recognition = new webkitSpeechRecognition();
            this.state.recognition.continuous = false;
            this.state.recognition.interimResults = false;
            this.state.recognition.lang = this.state.preferences.language;

            this.state.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.elements.userInput.value = transcript;
                this.handleSendMessage();
            };

            // Create voice input toggle
            const voiceInputToggle = document.createElement('button');
            voiceInputToggle.innerHTML = '🎙️';
            voiceInputToggle.classList.add('voice-toggle');
            voiceInputToggle.addEventListener('click', () => {
                this.state.voiceEnabled = !this.state.voiceEnabled;
                if (this.state.voiceEnabled) {
                    this.state.recognition.start();
                    voiceInputToggle.classList.add('active');
                } else {
                    this.state.recognition.stop();
                    voiceInputToggle.classList.remove('active');
                }
            });

            this.elements.voiceInputToggle = voiceInputToggle;
            this.elements.userInput.parentNode.insertBefore(voiceInputToggle, this.elements.userInput.nextSibling);
        }

        // Local Storage for Chat History
        saveChatHistory() {
            try {
                // Limit history to last 50 messages
                const limitedHistory = this.state.messageHistory.slice(-50);
                localStorage.setItem('chatHistory', JSON.stringify(limitedHistory));
            } catch (error) {
                console.error('Error saving chat history:', error);
            }
        }

        loadChatHistory() {
            try {
                const savedHistory = localStorage.getItem('chatHistory');
                if (savedHistory) {
                    const parsedHistory = JSON.parse(savedHistory);
                    parsedHistory.forEach(message => {
                        this.addMessage(message.content, message.role === 'user');
                    });
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        }

        // Settings Modal
        createSettingsModal() {
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div class="settings-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div class="bg-white p-6 rounded-lg">
                        <h2>Chatbot Settings</h2>
                        <div>
                            <label>
                                Theme:
                                <select id="themeSelect">
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Font Size:
                                <select id="fontSizeSelect">
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Notifications:
                                <input type="checkbox" id="notificationsToggle">
                            </label>
                        </div>
                        <button id="saveSettings">Save</button>
                        <button id="closeSettings">Close</button>
                    </div>
                </div>
            `;

            // Settings toggle
            const settingsToggle = document.createElement('button');
            settingsToggle.innerHTML = '⚙️';
            settingsToggle.classList.add('settings-toggle');
            settingsToggle.addEventListener('click', () => {
                document.body.appendChild(modal.firstElementChild);
                
                // Populate current settings
                const { theme, fontSize, notifications } = this.state.preferences;
                document.getElementById('themeSelect').value = theme;
                document.getElementById('fontSizeSelect').value = fontSize;
                document.getElementById('notificationsToggle').checked = notifications;
            });

            this.elements.settingsToggle = settingsToggle;
            this.elements.userInput.parentNode.insertBefore(settingsToggle, this.elements.userInput.nextSibling);

            // Modal event listeners
            modal.querySelector('#saveSettings').addEventListener('click', () => {
                const newPreferences = {
                    theme: document.getElementById('themeSelect').value,
                    fontSize: document.getElementById('fontSizeSelect').value,
                    notifications: document.getElementById('notificationsToggle').checked
                };
                this.savePreferences(newPreferences);
                modal.firstElementChild.remove();
            });

            modal.querySelector('#closeSettings').addEventListener('click', () => {
                modal.firstElementChild.remove();
            });
        }

        // Message Handling
        addMessage(message, isUser) {
            const messageContainer = document.createElement('div');
            messageContainer.className = `message-container ${isUser ? 'user' : 'bot'}`;
            
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = this.formatMessage(message);
            
            const timestamp = document.createElement('div');
            timestamp.className = 'timestamp';
            timestamp.textContent = new Date().toLocaleTimeString();
            
            messageContainer.appendChild(messageElement);
            messageContainer.appendChild(timestamp);
            this.elements.chatBox.appendChild(messageContainer);
            
            this.scrollToBottom();
        }

        formatMessage(text) {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>')
                .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        }

        scrollToBottom() {
            this.elements.chatBox.scrollTop = this.elements.chatBox.scrollHeight;
        }

        // Message Sending
        async handleSendMessage() {
            const input = this.elements.userInput.value.trim();
            if (!input) return;

            // Add user message
            this.addMessage(input, true);
            this.state.messageHistory.push({ role: 'user', content: input });
            
            // Process message
            this.elements.userInput.value = '';
            this.elements.userInput.disabled = true;
            
            // Intent recognition
            const intent = this.intentRecognition.recognize(input);
            const response = await this.generateResponse(input, intent);
            
            this.addMessage(response, false);
            this.state.messageHistory.push({ role: 'assistant', content: response });
            
            // Save chat history
            this.saveChatHistory();
            
            this.elements.userInput.disabled = false;
            this.elements.userInput.focus();
        }

        // Response Generation
        async generateResponse(input, intent) {
            // Simulated more advanced response generation
            switch(intent) {
                case 'greeting':
                    return `Hello! You seem to be saying ${input}. How can I help you today?`;
                case 'help':
                    return `I noticed you might need help. What specific assistance do you require?`;
                case 'farewell':
                    return `Goodbye! Feel free to return if you need further assistance.`;
                default:
                    return `I understood your message, but I'm not sure how to respond specifically to: "${input}"`;
            }
        }

        // Event Listeners
        setupEventListeners() {
            this.elements.sendMessageButton.addEventListener('click', () => this.handleSendMessage());
            
            this.elements.userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage();
                }
            });
        }

        // Initialization
        initialize() {
            // Apply saved preferences
            this.applyPreferences();
            
            // Setup features
            this.setupEventListeners();
            this.setupVoiceInput();
            this.createSettingsModal();
            
            // Load previous chat history
            this.loadChatHistory();
            
            // Initial greeting
            setTimeout(() => {
                this.addMessage("👋 Welcome! How can I assist you today?", false);
            }, 500);
        }
    }

    // Intent Recognition Class
    class IntentRecognizer {
        constructor() {
            this.intents = {
                greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
                farewell: ['bye', 'goodbye', 'see you', 'later', 'talk to you later'],
                help: ['help', 'support', 'assist', 'guidance', 'question', 'problem'],
                thanks: ['thanks', 'thank you', 'appreciate', 'grateful']
            };
        }

        recognize(input) {
            const lowercaseInput = input.toLowerCase();
            
            for (const [intent, keywords] of Object.entries(this.intents)) {
                if (keywords.some(keyword => lowercaseInput.includes(keyword))) {
                    return intent;
                }
            }
            
            return 'general';
        }
    }

    // Initialize the chatbot
    new AIChatbot();
});