import axios from 'axios';
import React, { useState } from 'react';
import { BASEURL } from './App.js';

export const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh'));
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access'));

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
    <UserContext.Provider value={{ loggedIn, userName, accessToken, login, register }}>{children}</UserContext.Provider>
  );
};
