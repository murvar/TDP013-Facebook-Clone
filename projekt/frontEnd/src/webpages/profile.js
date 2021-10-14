import React, { Component } from 'react'
import {useHistory} from 'react-router-dom';
import Wallprofile from './components/Wallprofile';
import Logout from './components/Logout';
import Friends from './components/Friends';
import Searchfield from './components/Searchfield';

export default function Profile() {
    return (
        <div>
            <Searchfield />
            <Wallprofile />
            <Friends />
            <Logout />
        </div>
    )
}
