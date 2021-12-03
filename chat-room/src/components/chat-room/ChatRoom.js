import React, { useState, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/chat-room/NavBar.css';
import '../../styles/chat-room/ChatRoom.css';
import logo from '../../images/logo.png';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import MemberList from './MemberList';
import { UserContext } from '../UserContext.js';
import { BASEURL } from '../App.js';

// TODO - get messages array from the server
const demoData = [
  { author: 'rama', message: 'Hello', time: moment().format('llll') },
  { author: 'bla', message: 'hello to you', time: moment().format('llll') },
  { author: 'no one', message: 'I am no one', time: moment().format('llll') },
  { author: 'no one2', message: 'I am no one2', time: moment().format('llll') },
  {
    author: 'rama',
    message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
    time: moment().format('llll'),
  },
];

export default function ChatRoom() {
  /***** STATES *****/
  const [messages, setMessages] = useState([]);
  const { userName } = useContext(UserContext);

  /***** FUNCTIONS *****/
  const sendMessage = async (content) => {
    try {
      console.log(userName, content);
      const response = await axios.post(`${BASEURL}/chat/send-message`, {
        userName,
        content,
        timeStamp: String(moment().format('llll')),
      });
      console.log(response.data); // TODO - ADD SUCCESS MESSAGE
    } catch (error) {
      console.log(error); // TODO - ADD ERROR MESSAGE
    }
  };

  return (
    <div>
      {/* NAV BAR - TODO NAVBAR COMPONENT */}
      <ul className='nav-bar'>
        <li>
          <img className='logo' alt='logo' src={logo} />
        </li>
        <Link to={'/'}>
          <li className='logout-nav'>
            <i className='fas fa-sign-out-alt'></i> LogOut
          </li>
        </Link>
      </ul>
      {/* GENERAL SCREEN */}
      <div className='chat-room'>
        <div className='messages-list'>
          <MessagesList chatData={demoData} />
        </div>
        <div className='message-input'>
          <MessageInput sendMessage={sendMessage} />
        </div>
        <div className='members-list'>
          <h2>Members: </h2>
          <MemberList chatData={demoData} />
        </div>
      </div>
    </div>
  );
}
