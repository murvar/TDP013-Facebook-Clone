import React from 'react'
import Wallprofile from './components/Wallprofile';
import Logout from './components/Logout';
import Friends from './components/Friends';
import Searchfield from './components/Searchfield';
import Home from './components/Home';
import InviteDropDown from './components/InviteDropDown';
import { Row, Col, Container } from 'react-bootstrap';

export default function home() {
    return (
        <Container id="home">
            <Row className="mt-1">
            </Row>
            <Row>
                <Col>
                    <Home />
                </Col>
                <Col>
                    <Searchfield />
                </Col>
                <Col>
                    <InviteDropDown />
                </Col>
                <Col>
                    <Logout />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Wallprofile />
                </Col>
                <Col>
                    <Friends />
                </Col>

            </Row>
            
        </Container>
    )
}
