import React from 'react'
import Searchfield from './components/Searchfield';
import Friends from './components/Friends';
import Searchresults from './components/Searchresults';
import Logout from './components/Logout'
import Home from './components/Home'
import InviteDropDown from './components/InviteDropDown';
import { Row, Col, Container } from 'react-bootstrap';


export default function search() {

    return (
        <Container className="profile">
            <Row id='top'>
                <Col xs={12} md={2} sm={0}>
                    <Home />
                </Col>
                <Col xs={12} md={6} sm={0}>
                    <Searchfield />
                </Col>
                <Col xs={12} md={2} sm={0}>
                    <InviteDropDown />
                </Col>
                <Col xs={12} md={2} sm={0}>
                    <Logout />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={2} sm={0}>
                </Col>
                <Col xs={12} md={8} sm={12} id='results'>
                <Searchresults />
                </Col>
                <Col xs={6} md={2} sm={0} id='test'>
                    <Friends />
                </Col>

            </Row>
            
        </Container>
    )
}
