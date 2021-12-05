import React, { useRef, useContext, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import '../../styles/chat-room/NavBar.css';
import '../../styles/chat-room/ChatRoom.css';
import logo from '../../images/logo.png';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import MemberList from './MemberList';
import { UserContext, useCheckLoggedIn } from '../UserContext.js';
import { BASEURL } from '../App.js';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
const notyf = new Notyf();

export default function ChatRoom() {
  /***** REFS *****/
  const messageEl = useRef(null);
  const chatArea = useRef(null);
  const membersArea = useRef(null);

  /***** STATES *****/
  const { userName, messages, onLineUsers, logout, accessToken } = useContext(UserContext);

  /***** FUNCTIONS *****/
  //Scroll down the massages list on new massages
  useEffect(() => {
    if (messageEl !== null) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);
  //Navigate to login page users that isn't loggedIn
  useCheckLoggedIn();
  //Send message to server
  const sendMessage = async (content) => {
    try {
      const response = await axios.post(
        `${BASEURL}/chat/send-message`,
        {
          userName,
          content,
          timeStamp: String(moment().format('llll')),
        },
        {
          headers: {
            AccessToken: accessToken,
          },
        }
      );
      notyf.success(response.data); //success message
    } catch (error) {
      notyf.error(`Sorry, ${error.response.data}. please try again!`); //error message
    }
  };

  return (
    <div>
      {/* NAV BAR */}
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

      {/* GENERAL SCREEN */}
      <div className='chat-room'>
        <div className='messages-list show' ref={chatArea}>
          <MessagesList chatData={messages} messagesRef={messageEl} /> {/* MESSAGES */}
        </div>

        <div className='message-input'>
          <MessageInput sendMessage={sendMessage} /> {/* TYPE INPUT */}
        </div>

        <div className='members-list' ref={membersArea}>
          <MemberList chatData={onLineUsers} /> {/* CHAT ONLINE MEMBERS */}
        </div>
      </div>
    </div>
  );
}
