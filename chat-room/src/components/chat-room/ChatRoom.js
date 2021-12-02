import React from 'react';
import '../../styles/chat-room/NavBar.css';
import '../../styles/chat-room/ChatRoom.css';
import logo from '../../images/logo.png';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';

export default function ChatRoom() {
  return (
    <div>
      {/* NAV BAR - TODO NAVBAR COMPONENT */}
      <ul>
        <li>
          <img className='logo' alt='logo' src={logo} />
        </li>
        <li className='logout-nav'>
          <i className='fas fa-sign-out-alt'></i> LogOut
        </li>
      </ul>
      {/* GENERAL SCREEN */}
      <div className='chat-room'>
        <div className='messages-list'>
          <MessagesList />
        </div>
        <div className='message-input'>
          <MessageInput />
        </div>
        <div className='members-list'>
          {/* MEMBERS LIST - TODO- ADD COMPONENT */}
          <div>MEMBER</div> {/* TODO - MEMBER COMPONENT */}
          <div>MEMBER</div> {/* TODO - MEMBER COMPONENT */}
          <div>MEMBER</div> {/* TODO - MEMBER COMPONENT */}
        </div>
      </div>
    </div>
  );
}
