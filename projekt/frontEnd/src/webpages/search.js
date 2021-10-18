import React from 'react'
import Searchfield from './components/Searchfield';
import Friends from './components/Friends';
import Searchresults from './components/Searchresults';
import Logout from './components/Logout'
import Home from './components/Home'


export default function search() {

    return (
        <div>   
            <Searchfield />
            <Searchresults />
            <Friends />
            <Logout />
            <Home />
        </div>
    )
}
