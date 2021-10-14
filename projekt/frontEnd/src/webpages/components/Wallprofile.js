import React from 'react';
import Postonwall from './Postonwall'
import Messages from './Messages';
import { useParams } from 'react-router-dom'


/*  
    Skall hämta komponent som tillåter en användare 
    att posta meddelanden på en vägg.
    Skall hämta komponent som displayar alla meddelanden
*/

export default function Wallprofile() {
    const userID = useParams()
    return (
        <div>
            <h1> {userID.id}'s wall </h1>
            <Postonwall />
            <Messages />
        </div>
    )
}
    