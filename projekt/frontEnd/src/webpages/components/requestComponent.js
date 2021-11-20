import React from 'react'
import {getCookie, answerFriendRequest} from './../../serverFetch'

export default function RequestComponent(props) {

    //PROPS.name

    const sessionID = getCookie("sessionID")

    const [answered, setAnswered] = React.useState(false);
    const [accepted, setAccepted] = React.useState(false);

    const answerFriendRequestHandler = async (userID, answer) => {
        //e.preventDefault()
        console.log("Running Friend Request handler")
        console.log(userID)
        console.log(sessionID)
        console.log(answer)
        answerFriendRequest(userID, sessionID, answer)
        .then(res => {
            setAccepted(answer)
            setAnswered(true)
        })
    }

    // React.useEffect(() => {

    // }, [])


    //LÄGG MÄRKE TILL ATT "TYPE = BUTTON" PÅ BUTTON
    return (
        <div>
            <p>{props.userID}</p>
            {(() => {
                
                if (!answered) {
                    return(
                        <div>
                        <button onClick={() => answerFriendRequestHandler(props.userID, true)}
                            type="button" 
                            id="acceptButton">
                            Accept
                        </button>
                        <button onClick={() => answerFriendRequestHandler(props.userID, false)}
                            type="button" 
                            id="denyButton">
                            Deny
                        </button>
                        </div>
                    )
                } 
                else {
                    if(accepted) {
                        return <p>Friend request accepted</p>
                    } else {
                        return <p>Friend request denied</p>
                    }
                }

            })()}            
        </div>
    )
}
