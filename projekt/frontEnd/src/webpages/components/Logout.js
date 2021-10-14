import React from 'react';
import {useHistory} from 'react-router-dom';
import {logout, getCookie} from './../../serverFetch';


export default function Logout() {
    let history = useHistory();

    const logoutHandler = async (e) => {
        e.preventDefault()
        let sessionID = getCookie()
        
        let logoutPromise = logout(sessionID)

        logoutPromise.then(
        function(res) {
            history.push('/login')
        },
        function(error) {
            console.log("You could not be signed out")
        })   
    }

    return (
        <div>
            <button onClick={logoutHandler} type="submit">Logout</button>
        </div>
    )
}
