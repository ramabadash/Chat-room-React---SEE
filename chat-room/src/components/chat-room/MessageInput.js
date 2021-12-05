import React, { useRef } from 'react';
import '../../styles/chat-room/MessageInput.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
const notyf = new Notyf();

export default function MessageInput({ sendMessage }) {
  /***** REFS *****/
  const contentInput = useRef(null);

  return (
    <div className='send-message'>
      <textarea
        ref={contentInput}
        className='message-input'
        type='text'
        placeholder='Write your message..'
        rows='5'
        onKeyPress={(e) => {
          const message = contentInput.current.value;
          if (e.key === 'Enter') {
            if (message) {
              sendMessage(message);
              contentInput.current.value = '';
            } else {
              notyf.error(`Cannot send empty message!`); //error message
            }
          }
        }}
      />
      <button
        className='send-btn'
        onClick={() => {
          const message = contentInput.current.value;
          if (message) {
            sendMessage(contentInput.current.value);
            contentInput.current.value = '';
          } else {
            notyf.error(`Cannot send empty message!`); //error message
          }
        }}
      >
        send
      </button>
    </div>
  );
}
