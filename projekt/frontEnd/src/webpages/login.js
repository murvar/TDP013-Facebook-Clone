import React from 'react'
import Login from './components/Login';
import Register from './components/Register';
import { Container, Row} from 'react-bootstrap';

export default function login() {
  return (
      <Container>
        <div id="background">
        <h1>Tvitter</h1>
        </div>
        <Row className="mt-4">
        </Row>
        <Row>
          <Login />

					<div className="mt-3 d-flex justify-content-center links">
						<Register/>
					</div>
        </Row>
      </Container>
  )
}

