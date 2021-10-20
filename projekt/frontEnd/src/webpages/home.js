import React from 'react'
import Wallprofile from './components/Wallprofile';
import Logout from './components/Logout';
import Friends from './components/Friends';
import Searchfield from './components/Searchfield';
import Home from './components/Home';
import InviteDropDown from './components/InviteDropDown';

export default function home() {
    return (
        <div>
            <Searchfield />
            <Wallprofile />
            <Friends />
            <Logout />
            <Home />
            <InviteDropDown />
        </div>
    )
}
