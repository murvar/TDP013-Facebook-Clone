import React from 'react';
import { useParams } from 'react-router-dom'
import {wall, homeWall, getCookie} from './../../serverFetch'
//let serverFetch = require("./../../serverFetch.js")

/* Baserar kod på https://youtu.be/OdNEg-tja70 /

/  Skall hämta alla meddelanden för en profil via databas. Skall
    konvertera informationen till html-element.
    Html-elementen skall wrappas i en div och sedan returneras.
*/

export default function Messages() {
    
    const [msgArray, setMsgArray] = React.useState([]);
    let userID = useParams().id
    if (userID == null) {
        userID = getCookie("userID")
    }
    let sessionID = getCookie("sessionID")

    React.useEffect(() => {
        wall(userID, sessionID)
        .then(res => {
            console.log("running useEffect in Messages")
            return res
        })
        .then(data => {
            setMsgArray(data)
        })
    
    }, [])


    
    return (
        <div>
            <h2>MESSAGES:</h2>
            {msgArray && msgArray.map((elem) => {
                return <li key={elem.time}>{elem.msg}</li>;
            })}
        </div>
    )
}