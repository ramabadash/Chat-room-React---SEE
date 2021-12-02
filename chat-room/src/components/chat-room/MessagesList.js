import React, { useState } from 'react';
import Message from './Message';
import '../../styles/chat-room/Message.css';

export default function MessagesList({ chatData }) {
  const [messages, setMessages] = useState(chatData);
  return (
    <ul id='chat'>
      {messages.map(({ author, message, time }) => (
        <Message message={message} author={author} time={time} key={message} />
      ))}
    </ul>
  );
}
