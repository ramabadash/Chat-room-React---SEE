import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext.js';
import '../../styles/chat-room/Message.css';

export default function Message({ message, author, time }) {
  const { userName } = useContext(UserContext);

  return (
    <li className={userName === author ? 'me' : 'you'}>
      <div className='entete'>
        <span className='status green'></span>
        <h2>{author}</h2> <h3>{time}</h3>
      </div>
      {/* <div className='triangle'></div> */}
      <div className='message'>{message}</div>
    </li>
  );
}
