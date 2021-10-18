import React from 'react';
import { useParams } from 'react-router-dom'
import {wall, getCookie} from './../serverFetch'
import Logout from './components/Logout';
import Friends from './components/Friends';
import Searchfield from './components/Searchfield';
import InvitesWall from './components/InvitesWall';

//Representerar sida som skall visa alla requests till folk som vill bli vän
//med dig

export default function Invites() {
    



    
    return (
        <div>
            <Searchfield />
            <Logout />
            <InvitesWall />
            <Friends />
        </div>
    )
}