import React from 'react';
import Postonwall from './Postonwall'
import Messages from './Messages';
import { useParams } from 'react-router-dom'
import { getCookie } from '../../serverFetch';


/*  
    Skall hämta komponent som tillåter en användare 
    att posta meddelanden på en vägg.
    Skall hämta komponent som displayar alla meddelanden
*/

export default function Wallprofile() {
    let userID = useParams().id
    if (userID == null) {userID = getCookie("userID")}
    console.log(userID)

    return (
        <div>
            <h1> {userID}'s wall </h1>
            <Postonwall />
            <Messages />
        </div>
    )
}
    