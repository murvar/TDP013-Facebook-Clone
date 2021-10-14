import React from 'react'
import {useHistory} from 'react-router-dom';
import {login} from '../serverFetch'

export default function Login() {

  let history = useHistory();
  const loginHandler = async (e) => {
    e.preventDefault()
    let username = document.getElementById("loginUsername").value
    let password = document.getElementById("loginPassword").value
    console.log(username + ", " + password)
    

    let loginPromise = login(username, password)

    loginPromise.then(
      function(value) {
        document.cookie = "sessionID=" + value;
        history.push('/profile/Tjatte')
      },
      function(error) {
        console.log(error)
      }
    )
  }
  return (
    <div>
      <form method="post">
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
