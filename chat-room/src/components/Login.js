import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { BASEURL } from '../components/App.js';

export default function Login() {
  /***** REFS *****/
  const userNameInput = useRef('');
  const passwordInput = useRef('');

  /***** FUNCTIONS *****/
  const navigate = useNavigate();

  // Send login form
  const login = async () => {
    const userName = userNameInput.current.value;
    const password = passwordInput.current.value;

    try {
      // TODO ADD VALIDATION
      if (!userName || !password) {
        throw new Error({ status: 400, message: 'Missing details' });
      }
      const response = await axios.post(`${BASEURL}/users/login`, {
        userName,
        password: String(password),
      });
      console.log(response.data); //TODO - ADD TOKEN TO COOKIES
      return response.data; //TODO- ADD SUCCESS MESSAGE
    } catch (error) {
      console.log(error); //TODO- ADD ERROR MESSAGE
    }
  };

  return (
    <div className='login-form'>
      <img
        className='login-img'
        alt='general-user'
        src='https://www.jing.fm/clipimg/full/297-2976720_avatar-for-login-page.png'
      />
      <h2>Login:</h2>
      <div>
        <span className='icon-span'>
          <i className='far fa-user'></i>
        </span>
        <input ref={userNameInput} id='userName' type='text' placeholder='User name'></input>{' '}
        {/* TODO ADD CONDITIONS */}
      </div>
      <div>
        <span className='icon-span'>
          <i className='fas fa-unlock-alt'></i>
        </span>
        <input ref={passwordInput} id='password' type='password' placeholder='Password'></input>{' '}
        {/* TODO ADD CONDITIONS */}
      </div>
      <button
        id='login-btn'
        onClick={async () => {
          const answer = await login();
          if (answer) navigate('/home');
          else return; //TODO- ADD ERROR FUNCTIONALITY / GET NEW TOKEN
        }}
      >
        LOGIN!
      </button>
      <hr />
      <Link to={'/register'}>
        <span>Not a member? create account!</span>
      </Link>
    </div>
  );
}
