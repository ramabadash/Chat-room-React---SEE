import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import ChatRoom from './chat-room/ChatRoom.js';
import Register from './Register.js';
import { UserProvider } from './UserContext';
export const BASEURL = 'http://localhost:8080';

export default function App() {
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route exect key='login' path={'/'} element={<Login />} />
          <Route exect key='register' path={'/register'} element={<Register />} />
          <Route exect key='chat' path={'/home'} element={<ChatRoom />} />
        </Routes>
      </UserProvider>
    </div>
  );
}
