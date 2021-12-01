import React from 'react';
import '../../styles/chat-room/NavBar.css';
import logo from '../../images/logo.png';

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
    </div>
  );
}
