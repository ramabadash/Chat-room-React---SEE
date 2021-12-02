import React from 'react';
import '../../styles/chat-room/Member.css';

export default function Member({ name }) {
  return (
    <li>
      <div>
        <h2>{name}</h2>
        <h3>
          <span className='status green'></span>
        </h3>
      </div>
      <img
        src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
        alt='user'
      />
    </li>
  );
}
