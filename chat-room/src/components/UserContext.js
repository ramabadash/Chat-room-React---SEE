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
  const [eventSource, setEventSource] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onLineUsers, setOnLineUsers] = useState([]);

  // Create stream connection to get messages and users
  useEffect(() => {
    if (!loggedIn && eventSource) {
      eventSource.close();
      setEventSource(false);
    }

    if (!eventSource && loggedIn) {
      const event = new EventSourcePolyfill(`${BASEURL}/chat/stream/?userName=${userName}`, {
        headers: {
          AccessToken: accessToken,
        },
      });

      event.onopen = (e) => {
        setEventSource(event);
      };

      event.onerror = console.log;

      event.onmessage = ({ data }) => {
        console.log('data', data);
        setMessages((prevMessages) => {
          const messages = JSON.parse(data).messageList;
          console.log('messages', messages);
          return Array.isArray(messages) ? messages : [...prevMessages, messages];
        });
        setOnLineUsers((prevUsers) => {
          const userData = JSON.parse(data).usersList;
          return Array.isArray(userData) ? userData : [...prevUsers, userData];
        });
      };
    }
  }, [eventSource, loggedIn, userName, accessToken]);

  // Send login form
  const login = async (userName, password) => {
    try {
      // TODO ADD VALIDATION
      if (!userName || !password) {
        return notyf.error(`Sorry, Missing details. please try again!`); //error message
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
      notyf.error(`Sorry, ${error.response.data}. please try again!`); //error message
    }
  };

  // Send register form
  const register = async (userName, password, email, gender) => {
    try {
      // TODO ADD VALIDATION
      if (!userName || !password || !email) {
        return notyf.error(`Sorry, Missing details. please try again!`); //error message
      }
      const response = await axios.post(`${BASEURL}/users/register`, {
        userName,
        password: String(password),
        email,
        gender,
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
      eventSource.close();
      setEventSource(false);

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
