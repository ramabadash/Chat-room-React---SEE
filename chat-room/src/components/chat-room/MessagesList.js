import React from 'react';
import Message from './Message';
import '../../styles/chat-room/Message.css';

export default function MessagesList({ chatData }) {
  return (
    <ul id='chat'>
      {chatData.map((message, index) =>
        message.userName ? (
          <Message message={message.content} author={message.userName} time={message.timeStamp} key={index} /> //user message
        ) : (
          <Message message={message} key={index} typeClass='joined' /> //User joined the chat message
        )
      )}
    </ul>
  );
}
