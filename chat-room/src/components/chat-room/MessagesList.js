import React, { useState } from 'react';
import Message from './Message';
import '../../styles/chat-room/Message.css';

export default function MessagesList({ chatData }) {
  return (
    <ul id='chat'>
      {chatData.map(({ userName, content, timeStamp }, index) => (
        <Message message={content} author={userName} time={timeStamp} key={index} />
      ))}
    </ul>
  );
}
