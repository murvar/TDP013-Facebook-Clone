import React from 'react'
import Searchfield from './components/Searchfield';
import Friends from './components/Friends';
import Searchresults from './components/Searchresults';
import Logout from './components/Logout'


export default function search() {

    return (
        <div>   
            <Searchfield />
            <Searchresults />
            <Friends />
            <Logout />
        </div>
    )
}
