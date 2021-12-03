import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { UserContext } from '../components/UserContext.js';

export default function Register() {
  /***** REFS *****/
  const userNameInput = useRef('');
  const passwordInput = useRef('');
  const emailInput = useRef('');

  /***** FUNCTIONS *****/
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  return (
    <div className='login-form'>
      <img
        className='login-img'
        alt='general-user'
        src='https://www.jing.fm/clipimg/full/297-2976720_avatar-for-login-page.png'
      />
      <h2>Register:</h2>
      <div>
        <span className='icon-span'>
          <i className='far fa-user'></i>
        </span>
        <input ref={userNameInput} id='userName' type='text' placeholder='User name'></input>{' '}
        {/* TODO ADD CONDITIONS */}
      </div>
      <div>
        <span className='icon-span'>
          <i className='fas fa-at'></i>
        </span>
        <input ref={emailInput} id='email' type='email' placeholder='Email'></input> {/* TODO ADD CONDITIONS */}
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
          const userName = userNameInput.current.value;
          const password = passwordInput.current.value;
          const email = emailInput.current.value;
          const answer = await register(userName, password, email);
          if (answer === 'Registered') navigate('/');
          else return;
        }}
      >
        Register!
      </button>
      <hr />
      <Link to={'/'}>
        <span>A member? Login!</span>
      </Link>
    </div>
  );
}
