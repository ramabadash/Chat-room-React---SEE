import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { BASEURL } from './App.js';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { EventSourcePolyfill } from 'event-source-polyfill'; // for React, Vue and Svelte
const notyf = new Notyf();

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
      const messageEvents = new EventSourcePolyfill(`${BASEURL}/chat/get-all/?userName=${userName}`, {
        headers: {
          AccessToken: accessToken,
        },
      });

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
      const usersEvents = new EventSourcePolyfill(`${BASEURL}/chat/users/?userName=${userName}`, {
        headers: {
          AccessToken: accessToken,
        },
      });

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
  }, [messages, usersConnection, loggedIn, userName]);

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
      notyf.success('Welcome!'); //success message
      return response.data;
    } catch (error) {
      notyf.error(`Sorry, ${error.error.message}. please try again!`); //error message
    }
  };

  // Send register form
  const register = async (userName, password, email) => {
    try {
      // TODO ADD VALIDATION
      if (!userName || !password || !email) {
        return notyf.error(`Sorry, Missing details. please try again!`); //error message
      }
      const response = await axios.post(`${BASEURL}/users/register`, {
        userName,
        password: String(password),
        email,
      });
      notyf.success(`User created successfully! `); //success message
      return response.data;
    } catch (error) {
      notyf.error(`Sorry, ${error.response.data}. please try again!`); //error message
    }
  };

  // Logout
  const logout = async () => {
    try {
      // Delete tokens from DB
      const response = await axios.post(`${BASEURL}/users/logout`, {
        userName,
      });

      // Delete states
      setUserName(null);
      setRefreshToken(null);
      setAccessToken(null);
      setLoggedIn(false);

      //Close connections
      messageConnection.close();
      usersConnection.close();
      setMessageConnection((prevEvent) => false);
      setUsersConnection((prevEvent) => false);

      notyf.success(`User logged out successfully! `); //success message
    } catch (error) {
      notyf.error(`Sorry, ${error.response.data}. please try again!`); //error message
    }
  };

  return (
    <UserContext.Provider value={{ loggedIn, userName, accessToken, messages, onLineUsers, login, register, logout }}>
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
