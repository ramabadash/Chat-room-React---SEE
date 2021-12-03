import React, { useRef } from 'react';
import '../../styles/chat-room/MessageInput.css';

export default function MessageInput({ sendMessage }) {
  /***** REFS *****/
  const contentInput = useRef(null);

  // Add send functionality - enter
  return (
    <div className='send-message'>
      <input ref={contentInput} className='message-input' type='text' placeholder='Write your message..' />
      <button
        className='send-btn'
        onClick={() => {
          sendMessage(contentInput.current.value);
          contentInput.current.value = '';
        }}
      >
        send
      </button>
    </div>
  );
}
