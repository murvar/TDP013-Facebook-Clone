import './App.css';
import React from 'react';
import { Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Webpages from "./webpages/index.js"
import { getCookie } from './serverFetch';


function App() {

  console.log("Running log from app.js with cookie = " + document.cookie)

  return (
    <div>
        <Webpages />
    </div>
  )
}

export default App;
