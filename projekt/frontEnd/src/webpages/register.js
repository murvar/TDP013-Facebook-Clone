import React from 'react'
import {useHistory} from 'react-router-dom';
import {registerFetch} from './../serverFetch'
import { Container, Row} from 'react-bootstrap';

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
    <Container>
      <div id="background">
        <h1>Tvitter</h1>
      </div>
      <Row className="mt-4">
      </Row>
    <div className="d-flex justify-content-center form_container">
      <form>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="loginUsername"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="loginPassword"
          /> <br />
        </div>
        <Row className="mt-4">
        </Row>
        <div className="d-flex justify-content-center form_container">
          <button onClick={registerHandler}
            type="submit" 
            id="loginbutton">
            Register
          </button>
        </div>
      </form>
    </div>
    </Container>
  )
}