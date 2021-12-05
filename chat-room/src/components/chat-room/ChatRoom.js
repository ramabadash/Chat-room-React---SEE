import React, { useRef, useContext, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import '../../styles/chat-room/ChatRoom.css';
import NavBar from './NavBar';
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
      <NavBar membersArea={membersArea} chatArea={chatArea} />
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
