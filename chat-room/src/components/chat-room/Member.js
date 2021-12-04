import React, { useContext } from 'react';
import '../../styles/chat-room/Member.css';
import avatarImg from '../../images/avatar.png';
import femaleImg from '../../images/avater-woman.png';

export default function Member({ name, gender }) {
  return (
    <li>
      <div>
        <h2>{name}</h2>
        <h3>
          <span className='status green'></span>
        </h3>
      </div>
      <img src={gender === 'Female' ? femaleImg : avatarImg} alt='user' />
    </li>
  );
}
