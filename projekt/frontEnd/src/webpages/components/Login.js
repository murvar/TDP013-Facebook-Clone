import React from "react";
import {useHistory} from 'react-router-dom';
import {getCookie, login} from './../../serverFetch'
import { Container, Row, Col} from 'react-bootstrap';

export default function Login(){
    let history = useHistory();

  if (getCookie("sessionID") !== "") {
    history.push('/')
  }
  
  const loginHandler = async (e) => {
    e.preventDefault()
    let username = document.getElementById("loginUsername").value
    let password = document.getElementById("loginPassword").value
    console.log(username + ", " + password)
    

    let loginPromise = login(username, password)

    loginPromise.then(
  
      function(value) {
          console.log(value)
          if (value) {
            document.cookie = "sessionID =" + value;
            document.cookie = "userID =" + username;
            history.push('/')
          }
          else {
            let err = document.getElementById('error')
            err.style.visibility = "visible";
            // if (!err.hasChildNodes) {
            //   let errmsg = document.createTextNode("Wrong username or password!")
            //   err.appendChild(errmsg)
            // }
            
          }
      },
      function(error) {
        console.log(error)
      }
    )
  }
  // return (
  //   <Container>
  //     <form method="post">
  //       <label htmlFor="username">Username:</label><br />
  //       <input
  //         type="text"
  //         name="username"
  //         defaultValue={getCookie("userID")}
  //         id="loginUsername"
  //       />
  //       <br />
  //       <label htmlFor="password">Password:</label><br />
  //       <input
  //         type="password"
  //         name="password"
  //         id="loginPassword"
  //       /> <br />
  //       <div id="error"></div>

  //       <button onClick={loginHandler}
  //         type="submit" 
  //         id="loginbutton">
  //         Login
  //         </button>
  //     </form>
  //   </Container>
  // )
  return(
    <div className="d-flex justify-content-center form_container">
      <form>
        <div className="mb-3">
          <input type="text" placeholder="username" id="loginUsername"/>
        </div>
        <div className="mb-2">
          <input type="password" placeholder="password" id="loginPassword"/>
        </div>
        <div id="error">Wrong username or password!</div>

        <div className="d-flex justify-content-center mt-3">
          <button onClick={loginHandler} type="submit" id="loginbutton">
            Login
          </button>
        </div>
      </form>
		</div>
  )
}