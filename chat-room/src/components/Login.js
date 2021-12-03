import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { UserContext } from '../components/UserContext.js';

export default function Login() {
  /***** REFS *****/
  const userNameInput = useRef('');
  const passwordInput = useRef('');

  /***** FUNCTIONS *****/
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

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
          const userName = userNameInput.current.value;
          const password = passwordInput.current.value;
          const answer = await login(userName, password);
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
