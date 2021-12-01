import React from 'react';
import '../../styles/chat-room/MessageInput.css';

export default function MessageInput() {
  // Add send functionality - button + enter
  return (
    <div className='send-message'>
      <input className='message-input' type='text' placeholder='Write your message..' />
      <button className='send-btn'>send</button>
    </div>
  );
}
