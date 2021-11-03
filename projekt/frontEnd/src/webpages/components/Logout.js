import React from 'react';
import {useHistory} from 'react-router-dom';
import {logout, getCookie} from './../../serverFetch';


export default function Logout() {
    let history = useHistory();

    const logoutHandler = async (e) => {
        e.preventDefault()
        let sessionID = getCookie("sessionID")
        
        let logoutPromise = logout(sessionID)

        logoutPromise.then(
        function(res) {
            document.cookie = "sessionID =" + "";
            // document.cookie = "userID =" + username;
            history.push('/login')
        },
        function(error) {
            console.log("You could not be signed out")
        })   
    }

    return (
        <div id='logout'>
            <button id="logoutButton" onClick={logoutHandler} type="submit"><i id="logoutIcon" className="fas fa-sign-out-alt"></i>Logout</button>
        </div>
    )
}
