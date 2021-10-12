import React from 'react'
import {useHistory} from 'react-router-dom';
//import serverFetch from './../serverFetch';
import {registerFetch} from './../serverFetch'

export default function register() {
  let history = useHistory();

  const registerHandler = async () => {
    let username = document.getElementById("loginUsername").value
    let password = document.getElementById("loginPassword").value
    console.log(username + password)
    
    registerFetch(username, password)
      .then(() => history.push('/login'))
      .catch(err => console.log(err))
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

        <button onClick={registerHandler}
          type="submit" 
          id="loginbutton">
          Register
          </button>
      </form>
    </div>
  )
}