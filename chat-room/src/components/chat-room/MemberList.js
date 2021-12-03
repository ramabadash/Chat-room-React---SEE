import React from 'react';
import Member from './Member';
import '../../styles/chat-room/Member.css';

export default function MemberList({ chatData }) {
  return (
    <ul>
      {chatData.map(({ userName }, index) => (
        <Member key={index} name={userName} />
      ))}
    </ul>
  );
}
