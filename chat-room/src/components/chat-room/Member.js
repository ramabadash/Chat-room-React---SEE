import React from 'react';
import '../../styles/chat-room/Member.css';
import avatarImg from '../../images/avatar.png';

export default function Member({ name }) {
  return (
    <li>
      <div>
        <h2>{name}</h2>
        <h3>
          <span className='status green'></span>
        </h3>
      </div>
      <img src={avatarImg} alt='user' />
    </li>
  );
}
