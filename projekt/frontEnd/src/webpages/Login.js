import React from 'react'
import {useHistory} from 'react-router-dom';
let serverFetch = require("./../serverFetch.js")


export default function Login() {

  let history = useHistory();
  const loginHandler = async () => {
    let username = document.getElementById("loginUsername").value
    let password = document.getElementById("loginPassword").value
    console.log(username + password)
    

    serverFetch.login(username, password)
      .then((res) => document.cookie = "sessionID = " + res)
    //console.log(sessionID)
    //document.cookie = "sessionID = " + sessionID
    console.log(document.cookie)
    history.push('/')
  
  }


  return (
    <div>
      <form>
        <label htmlFor="username">Username:</label><br />
        <input
          type="text"
          name="username"
          id="loginUsername"
        />
        <br />
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          name="password"
          id="loginPassword"
        /> <br />

        <button onClick={loginHandler}
          type="submit" 
          id="loginbutton">
          Login
          </button>
      </form>
    </div>
  )
}

/*
{() => {
          history.push('/home')
          }} 
*/