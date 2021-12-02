import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
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
        <input id='userName' type='text' placeholder='User name'></input> {/* TODO ADD CONDITIONS */}
      </div>
      <div>
        <span className='icon-span'>
          <i className='fas fa-unlock-alt'></i>
        </span>
        <input id='password' type='password' placeholder='Password'></input> {/* TODO ADD CONDITIONS */}
      </div>
      <Link to={'/home'}>
        <button id='login-btn'>LOGIN!</button>
      </Link>
      <hr />
      <Link to={'/register'}>
        <span>Not a member? create account!</span>
      </Link>
    </div>
  );
}
