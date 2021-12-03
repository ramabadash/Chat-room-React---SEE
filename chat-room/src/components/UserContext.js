import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BASEURL } from './App.js';

export const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [connection, setConnection] = useState(false);
  const [messages, setMessages] = useState([]);

  // Create stream connection - on login
  useEffect(() => {
    if (!connection && loggedIn) {
      const events = new EventSource(`${BASEURL}/chat/get-all/?userName=${userName}`);

      events.onopen = (e) => {
        setConnection(connection);
      };

      events.onerror = console.log;

      events.onmessage = ({ data }) => {
        setMessages((prevMessages) => {
          const messages = JSON.parse(data);
          return messages.length ? messages : [...prevMessages, messages];
        });
      };
    }
  }, [connection, loggedIn, userName]);

  // Send login form
  const login = async (userName, password) => {
    try {
      // TODO ADD VALIDATION
      if (!userName || !password) {
        throw new Error({ status: 400, message: 'Missing details' });
      }
      const response = await axios.post(`${BASEURL}/users/login`, {
        userName,
        password: String(password),
      });
      setRefreshToken(response.data.refreshToken);
      setAccessToken(response.data.accessToken);
      setUserName(userName);
      setLoggedIn(true);
      return response.data; //TODO- ADD SUCCESS MESSAGE
    } catch (error) {
      console.log(error); //TODO- ADD ERROR MESSAGE
    }
  };

  // Send register form
  const register = async (userName, password, email) => {
    try {
      // TODO ADD VALIDATION
      if (!userName || !password || !email) {
        throw new Error({ status: 400, message: 'Missing details' });
      }
      const response = await axios.post(`${BASEURL}/users/register`, {
        userName,
        password: String(password),
        email,
      });

      return response.data; //TODO- ADD SUCCESS MESSAGE
    } catch (error) {
      console.log(error); //TODO- ADD ERROR MESSAGE
    }
  };

  return (
    <UserContext.Provider value={{ loggedIn, userName, accessToken, messages, login, register }}>
      {children}
    </UserContext.Provider>
  );
};
