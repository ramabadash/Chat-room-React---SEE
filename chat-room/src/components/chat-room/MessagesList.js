import React, { useState } from 'react';
import moment from 'moment';
import Message from './Message';
import '../../styles/chat-room/Message.css';

// TODO - get messages array from the server
const demoMessages = [
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

export default function MessagesList() {
  const [messages, setMessages] = useState(demoMessages);
  return (
    <ul id='chat'>
      {messages.map(({ author, message, time }) => (
        <Message message={message} author={author} time={time} key={message} />
      ))}
    </ul>
  );
}
