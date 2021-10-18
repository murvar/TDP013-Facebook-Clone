import React, { Component } from 'react'
import {useHistory} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

export default function login() {
  return (
    <div>
      <Login />
      <Register />
    </div>
  )
}

