import React from 'react';
import { useParams } from 'react-router-dom'
import {friends, getCookie} from './../../serverFetch'
//let serverFetch = require("./../../serverFetch.js")

/* Baserar kod på https://youtu.be/OdNEg-tja70 /

/  Skall hämta alla meddelanden för en profil via databas. Skall
    konvertera informationen till html-element.
    Html-elementen skall wrappas i en div och sedan returneras.
*/

export default function Friends() {
    
    const [friendArray, setFriendArray] = React.useState([]);
    let sessionID = getCookie("sessionID")
    React.useEffect(() => {
        friends(sessionID)
        .then(res => {
            console.log("running useEffect in Friends")
            return res
        })
        .then(data => {
            setFriendArray(data)
        })
    
    }, [])

    
    return (
        <div>
            <h3>Friends: </h3>
            {friendArray && friendArray.map((elem) => {
                return (
                    <div className="friend" key={elem}>
                    <a href={"/profile/" + elem}>{elem}</a>
                    </div>
                    )
                })}
        </div>
    )
}