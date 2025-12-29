// Main JavaScript for Mira00 Hotel

document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const navButtons = document.querySelectorAll('.nav-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const mainTitle = document.getElementById('main-title');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab
            tabContents.forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            
            // Update main title
            updateMainTitle(tabId);
        });
    });
    
    function updateMainTitle(tabId) {
        const titles = {
            'hall': 'The Hall - Public Chat',
            'wall': 'The Wall - Public Board',
            'my-room': 'My Private Room',
            'history': 'Chat History'
        };
        
        if (titles[tabId]) {
            mainTitle.textContent = titles[tabId];
        }
    }
    
    // Modal Handling
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    // Open modals
    document.getElementById('btn-create-room').addEventListener('click', () => {
        openModal('create-room-modal');
    });
    
    document.getElementById('btn-find-room').addEventListener('click', () => {
        openModal('find-room-modal');
    });
    
    document.getElementById('btn-new-subject').addEventListener('click', () => {
        openModal('new-subject-modal');
    });
    
    document.getElementById('btn-visitor-requests').addEventListener('click', () => {
        openModal('visitor-requests-modal');
    });
    
    // Close modals
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    function openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }
    
    function closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
    
    // Chat Functionality
    const hallSendBtn = document.getElementById('hall-send-btn');
    const hallMessageInput = document.getElementById('hall-message-input');
    const hallChat = document.getElementById('hall-chat');
    
    const roomSendBtn = document.getElementById('room-send-btn');
    const roomMessageInput = document.getElementById('room-message-input');
    const roomChat = document.getElementById('room-chat');
    
    // Hall chat
    hallSendBtn.addEventListener('click', sendHallMessage);
    hallMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendHallMessage();
    });
    
    function sendHallMessage() {
        const message = hallMessageInput.value.trim();
        if (message) {
            addMessageToChat('hall', 'You', message, true);
            hallMessageInput.value = '';
            
            // Simulate reply (for demo)
            setTimeout(() => {
                const replies = [
                    "Welcome to the Hall!",
                    "Nice to meet you!",
                    "How are you today?",
                    "Anyone want to chat?",
                    "This is a great virtual hotel!"
                ];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                addMessageToChat('hall', 'RandomUser', randomReply, false);
            }, 1000);
        }
    }
    
    // Room chat
    roomSendBtn.addEventListener('click', sendRoomMessage);
    roomMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendRoomMessage();
    });
    
    function sendRoomMessage() {
        const message = roomMessageInput.value.trim();
        if (message) {
            addMessageToChat('room', 'You', message, true);
            roomMessageInput.value = '';
        }
    }
    
    function addMessageToChat(chatType, sender, content, isSent) {
        const chatContainer = chatType === 'hall' ? hallChat : roomChat;
        const messageClass = isSent ? 'sent' : 'received';
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${messageClass}`;
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="sender">${sender}</span>
                <span class="time">${time}</span>
            </div>
            <div class="message-content">${content}</div>
            ${isSent ? '<div class="message-actions"><button class="edit-btn"><i class="fas fa-edit"></i></button><button class="delete-btn"><i class="fas fa-trash"></i></button></div>' : ''}
        `;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Add edit/delete functionality for sent messages
        if (isSent) {
            const editBtn = messageDiv.querySelector('.edit-btn');
            const deleteBtn = messageDiv.querySelector('.delete-btn');
            
            editBtn.addEventListener('click', function() {
                const newContent = prompt('Edit your message:', content);
                if (newContent !== null) {
                    messageDiv.querySelector('.message-content').textContent = newContent;
                }
            });
            
            deleteBtn.addEventListener('click', function() {
                if (confirm('Delete this message?')) {
                    messageDiv.remove();
                }
            });
        }
    }
    
    // Initialize sample data
    initializeSampleData();
    
    function initializeSampleData() {
        // Add sample avatars to room
        const avatars = ['JD', 'AJ', 'MS', 'KT', 'RW'];
        const avatarsList = document.getElementById('room-avatars');
        
        avatars.forEach(avatar => {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar';
            avatarDiv.textContent = avatar;
            avatarDiv.title = `User ${avatar}`;
            avatarsList.appendChild(avatarDiv);
        });
        
        // Add sample subjects to wall
        const subjectsContainer = document.getElementById('subjects-container');
        const sampleSubjects = [
            {title: 'Welcome to Mira00 Hotel', author: 'Admin', content: 'Welcome everyone to our virtual hotel! Feel free to explore.'},
            {title: 'Room Decorations', author: 'User123', content: 'Anyone know how to change room decorations?'},
            {title: 'Meeting Tonight', author: 'Manager', content: 'Community meeting in the Hall at 8 PM.'}
        ];
        
        sampleSubjects.forEach(subject => {
            const subjectCard = document.createElement('div');
            subjectCard.className = 'subject-card';
            subjectCard.innerHTML = `
                <div class="subject-header">
                    <h4>${subject.title}</h4>
                    <div class="subject-meta">
                        <span>By: ${subject.author}</span>
                        <button class="delete-subject"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div class="subject-content">
                    ${subject.content}
                </div>
                <div class="subject-footer">
                    <button class="btn-comment"><i class="fas fa-comment"></i> Comment</button>
                    <span class="subject-date">Posted: Today</span>
                </div>
            `;
            subjectsContainer.appendChild(subjectCard);
        });
        
        // Add sample history cards
        const historyCardsContainer = document.getElementById('history-cards-container');
        const sampleHistory = [
            {type: 'hall', title: 'Hall Conversation', date: 'Today, 9:30 AM', preview: 'Welcome to the Hall! Feel free to chat...'},
            {type: 'room', title: 'Private Chat with Alex', date: 'Yesterday, 3:45 PM', preview: 'Hey, how are you doing?...'},
            {type: 'private', title: 'Direct Message', date: 'Dec 10, 2:15 PM', preview: 'Thanks for helping me with...'}
        ];
        
        sampleHistory.forEach(history => {
            const historyCard = document.createElement('div');
            historyCard.className = 'history-card';
            historyCard.innerHTML = `
                <div class="history-card-header">
                    <h4>${history.title}</h4>
                    <span class="history-type">${history.type.toUpperCase()}</span>
                </div>
                <div class="history-card-content">
                    <p>${history.preview}</p>
                    <small>${history.date}</small>
                </div>
                <div class="history-card-actions">
                    <button class="btn-view"><i class="fas fa-eye"></i> View</button>
                    <button class="btn-download"><i class="fas fa-download"></i> Save</button>
                </div>
            `;
            historyCardsContainer.appendChild(historyCard);
        });
    }
    
    // Notification sound simulation
    function playNotificationSound() {
        // In a real app, you would play an actual sound file
        console.log('Notification sound played');
    }
    
    // Simulate notification
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            playNotificationSound();
            
            // Update notification badge
            const badge = document.querySelector('.notification-bell .badge');
            if (badge) {
                let count = parseInt(badge.textContent) || 0;
                badge.textContent = count + 1;
                badge.style.display = 'flex';
            }
        }
    }, 30000); // Every 30 seconds
});