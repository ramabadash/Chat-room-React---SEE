import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { BASEURL } from './App.js';

export const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [messageConnection, setMessageConnection] = useState(false);
  const [usersConnection, setUsersConnection] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onLineUsers, setOnLineUsers] = useState([]);

  // Create stream connection to get messages- on login
  useEffect(() => {
    if (!messageConnection && loggedIn) {
      const messageEvents = new EventSource(`${BASEURL}/chat/get-all/?userName=${userName}`);

      messageEvents.onopen = (e) => {
        setMessageConnection(messageEvents);
      };

      messageEvents.onerror = console.log;

      messageEvents.onmessage = ({ data }) => {
        setMessages((prevMessages) => {
          const messages = JSON.parse(data);
          return Array.isArray(messages) ? messages : [...prevMessages, messages];
        });
      };
    }
  }, [messageConnection, loggedIn, userName]);

  // Create stream connection to get users- on login
  useEffect(() => {
    if (!usersConnection && loggedIn) {
      const usersEvents = new EventSource(`${BASEURL}/chat/users/?userName=${userName}`);

      usersEvents.onopen = (e) => {
        setUsersConnection(usersEvents);
      };

      usersEvents.onerror = console.log;

      usersEvents.onmessage = ({ data }) => {
        setOnLineUsers((prevUsers) => {
          const userData = JSON.parse(data);
          return Array.isArray(userData) ? userData : [...prevUsers, userData];
        });
      };
    }
  }, [usersConnection, loggedIn, userName]);

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
    <UserContext.Provider value={{ loggedIn, userName, accessToken, messages, onLineUsers, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

//Navigate to login page users that isn't loggedIn
export const useCheckLoggedIn = () => {
  const { loggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) navigate('/');
  }, [loggedIn, navigate]);
  return loggedIn;
};
