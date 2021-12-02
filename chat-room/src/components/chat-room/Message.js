import React, { useState } from 'react';
import '../../styles/chat-room/Message.css';

export default function Message({ message, author, time }) {
  const [userName, setUserName] = useState('rama'); // Demo to my user name - give different class name

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
