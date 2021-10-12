import React from 'react';
import { useParams } from 'react-router-dom'
import {wall} from './../../serverFetch.js'
//let serverFetch = require("./../../serverFetch.js")

/* Baserar kod på https://youtu.be/OdNEg-tja70 /

/  Skall hämta alla meddelanden för en profil via databas. Skall
    konvertera informationen till html-element.
    Html-elementen skall wrappas i en div och sedan returneras.
*/

export default function Messages() {

    //Hämta alla meddelanden för ett specifikt användarnamn och sessionID
    //Kolla URL, om inte "/" skall serverFetch.wall anropas, annars serverFectch.homeWall
    //hämta
    let sessionID = "674b93fc-2fe0-43fd-ae9d-2e4637ac617e";
    let userID = useParams()
    /*
    function MessageObject(data) {
        <div>
            <p>data.msg</p>
            <p>data.time</p>
            <p>data.sender</p>
        </div>
    }

    function DisplayMessages() {
        const msgList =props.msgList;

        const listElements = msgList.map((msg) => <MessageObject key={msg.time})
    }
    */
    async function GetMessages() {
        if (userID != null) {
            // console.log(sessionID)
            // console.log(userID.id)

            let allMessages = wall(userID.id, sessionID)
            //console.log(allMessages[1])
            const listItems = await allMessages.map((msg) =>
            console.log(msg))
        } else {
            //Logik för om userId ej anges
            console.log("Logic has not been implemented @ messages.js")
        }
    }
    GetMessages()

    return (
        <div>
        </div>
    )
}