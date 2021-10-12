import React from 'react';
import {useHistory} from 'react-router-dom';
import serverFetch from './../../serverFetch';


export default function Logout() {
    let history = useHistory();

    const logoutHandler = async () => {
        let sessionID = "2c43e859-36d3-4ce1-a8c4-823d1c9448c0"       
        if (serverFetch.logout(sessionID)) {history.push('/login')}
        else {console.log("You could not be signed out")}
    }

    return (
        <div>
            <button onClick={logoutHandler} type="submit">Logout</button>
        </div>
    )
}
