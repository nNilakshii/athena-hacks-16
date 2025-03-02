import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Friends.css';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('commons'); // 'commons' or 'pending'
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  // Mock data for friends
  const friends = [
    {
      id: 1,
      name: "Sarah Chen",
      major: "Computer Science",
      lastMessage: "See you in class tomorrow!",
      year: "Junior",
      interests: ["Coding", "Gaming", "Coffee"],
      classes: ["CSCI 401", "CSCI 310"],
      messages: [
        { id: 1, sender: "Sarah", text: "Hey! Want to study together for the midterm?", time: "2:30 PM" },
        { id: 2, sender: "You", text: "Sure! When are you free?", time: "2:35 PM" },
        { id: 3, sender: "Sarah", text: "How about tomorrow at 3?", time: "2:36 PM" },
        { id: 4, sender: "You", text: "Perfect! Library?", time: "2:40 PM" },
        { id: 5, sender: "Sarah", text: "See you in class tomorrow!", time: "2:41 PM" }
      ]
    },
    {
      id: 2,
      name: "Mike Johnson",
      major: "Biology",
      year: "Senior",
      interests: ["Research", "Lab work", "Tennis"],
      classes: ["BIO 401", "CHEM 310"],
      lastMessage: "Thanks for the notes!",
      messages: [
        { id: 1, sender: "Mike", text: "Could you share today's lecture notes?", time: "11:20 AM" },
        { id: 2, sender: "You", text: "Just sent them!", time: "11:45 AM" },
        { id: 3, sender: "Mike", text: "Thanks for the notes!", time: "11:46 AM" }
      ]
    }
  ];

  // Mock data for pending requests
  const pendingRequests = [
    {
      id: 3,
      name: "Emily Rodriguez",
      major: "Psychology",
      year: "Sophomore",
      interests: ["Research", "Hiking", "Photography"],
      classes: ["PSYC 355", "PSYC 201"],
      requestTime: "2 days ago"
    },
    {
      id: 4,
      name: "James Wilson",
      major: "Global Health",
      year: "Junior",
      interests: ["Volunteering", "Travel", "Music"],
      classes: ["BISC 408", "HEAL 310"],
      requestTime: "1 day ago"
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  const handleAcceptRequest = (requestId) => {
    console.log('Accepting request:', requestId);
    // Here you would implement the logic to accept the request
  };

  const handleRejectRequest = (requestId) => {
    console.log('Rejecting request:', requestId);
    // Here you would implement the logic to reject the request
  };

  return (
    <div className="friends-container">
      <Navbar />
      <div className="friends-content">
        <div className="friends-tabs">
          <button 
            className={`tab-btn ${activeTab === 'commons' ? 'active' : ''}`}
            onClick={() => setActiveTab('commons')}
          >
            My Commons
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Requests
          </button>
        </div>

        <div className="friends-main">
          <div className="friends-list">
            {activeTab === 'commons' ? (
              <>
                <h2>My Commons</h2>
                {friends.map(friend => (
                  <div
                    key={friend.id}
                    className={`friend-item ${selectedFriend?.id === friend.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFriend(friend)}
                  >
                    <div className="friend-info">
                      <h3>{friend.name}</h3>
                      <p className="friend-major">{friend.major}</p>
                      <p className="last-message">{friend.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h2>Pending Requests</h2>
                {pendingRequests.map(request => (
                  <div
                    key={request.id}
                    className={`friend-item ${selectedFriend?.id === request.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFriend(request)}
                  >
                    <div className="friend-info">
                      <h3>{request.name}</h3>
                      <p className="friend-major">{request.major}</p>
                      <p className="request-time">Requested {request.requestTime}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="content-section">
            {selectedFriend && activeTab === 'commons' ? (
              <>
                <div className="chat-header">
                  <h3>{selectedFriend.name}</h3>
                  <p>{selectedFriend.major}</p>
                </div>
                
                <div className="messages-container">
                  {selectedFriend.messages.map(message => (
                    <div
                      key={message.id}
                      className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        <p>{message.text}</p>
                        <span className="message-time">{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="message-input-form">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                  />
                  <button type="submit" className="send-button">Send</button>
                </form>
              </>
            ) : selectedFriend && activeTab === 'pending' ? (
              <div className="profile-view">
                <div className="profile-header">
                  <h3>{selectedFriend.name}</h3>
                  <p className="profile-year">{selectedFriend.year}</p>
                </div>
                <div className="profile-details">
                  <div className="detail-section">
                    <h4>Major</h4>
                    <p>{selectedFriend.major}</p>
                  </div>
                  <div className="detail-section">
                    <h4>Classes</h4>
                    <div className="tags">
                      {selectedFriend.classes.map((cls, index) => (
                        <span key={index} className="tag">{cls}</span>
                      ))}
                    </div>
                  </div>
                  <div className="detail-section">
                    <h4>Interests</h4>
                    <div className="tags">
                      {selectedFriend.interests.map((interest, index) => (
                        <span key={index} className="tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="request-actions">
                  <button 
                    className="accept-btn"
                    onClick={() => handleAcceptRequest(selectedFriend.id)}
                  >
                    Accept
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleRejectRequest(selectedFriend.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a {activeTab === 'commons' ? 'friend to start chatting' : 'request to view details'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Friends; 