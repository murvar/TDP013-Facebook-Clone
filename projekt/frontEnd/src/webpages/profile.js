import React from 'react'
import Wallprofile from './components/Wallprofile';
import Logout from './components/Logout';
import Friends from './components/Friends';
import Searchfield from './components/Searchfield';
import Home from './components/Home';

export default function Profile() {
    return (
        <div>
            <Searchfield />
            <Wallprofile />
            <Friends />
            <Logout />
            <Home />
        </div>
    )
}
