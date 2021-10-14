import React from 'react';
import {getFriendRequests, getCookie} from './../../serverFetch'

export default function Messages() {
    
    const [requestArray, setRequestsArray] = React.useState([]);
    let sessionID = getCookie()

    React.useEffect(() => {
        getFriendRequests(sessionID)
        .then(res => {
            console.log("running useEffect in getFriendRequests")
            return res
        })
        .then(data => {
            setRequestsArray(data)
        })
    
    }, [])


    
    return (
        <div>
            <h2>Invite requests</h2>
            {requestArray && requestArray.map((elem) => {
                return <li key={elem}>{elem}</li>;
            })}
        </div>
    )
}