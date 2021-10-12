import React from 'react';
import { useState } from 'react';
import Postonwall from './Postonwall'
import Messages from './Messages';


/*  
    Skall hämta komponent som tillåter en användare 
    att posta meddelanden på en vägg.
    Skall hämta komponent som displayar alla meddelanden
*/

export default function Wallprofile() {
    return (
        <div>
            <Postonwall />
            <Messages />
        </div>
    )
}
    