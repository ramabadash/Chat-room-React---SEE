import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

export default function Register() {
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
        <input id='userName' type='text' placeholder='User name'></input> {/* TODO ADD CONDITIONS */}
      </div>
      <div>
        <span className='icon-span'>
          <i className='fas fa-at'></i>
        </span>
        <input id='email' type='email' placeholder='Email'></input> {/* TODO ADD CONDITIONS */}
      </div>
      <div>
        <span className='icon-span'>
          <i className='fas fa-unlock-alt'></i>
        </span>
        <input id='password' type='password' placeholder='Password'></input> {/* TODO ADD CONDITIONS */}
      </div>
      <Link to={'/'}>
        <button id='login-btn'>Register!</button>
      </Link>
      <hr />
      <Link to={'/'}>
        <span>A member? Login!</span>
      </Link>
    </div>
  );
}
