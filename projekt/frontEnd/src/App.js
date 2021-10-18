import './App.css';
import React from 'react';
import Webpages from "./webpages/index.js"


function App() {

  console.log("Running log from app.js with cookie = " + document.cookie)

  return (
    <div>
        <Webpages />
    </div>
  )
}

export default App;
