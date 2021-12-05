import React, { useContext } from 'react';
import '../../styles/chat-room/NavBar.css';
import logo from '../../images/logo.png';
import { UserContext } from '../UserContext.js';

export default function NavBar({ membersArea, chatArea }) {
  const { userName, logout } = useContext(UserContext);

  return (
    <ul className='nav-bar'>
      <li>
        <img className='logo' alt='logo' src={logo} />
      </li>
      <li className='logout-nav' onClick={logout}>
        <i className='fas fa-sign-out-alt'></i> LogOut
      </li>
      <li className='user-nav'>
        {`Hello ${userName}!  `}
        <i className='far fa-user-circle'></i>
      </li>
      <li
        className='switch-nav members'
        onClick={(e) => {
          //Switch btn content
          e.target.classList.toggle('members');
          e.target.classList.toggle('chat');
          //Switch between chat and members screen
          membersArea.current.classList.toggle('show');
          chatArea.current.classList.toggle('show');
        }}
      ></li>
    </ul>
  );
}
