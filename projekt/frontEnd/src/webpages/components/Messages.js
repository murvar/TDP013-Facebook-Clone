import React from 'react';
import { useParams } from 'react-router-dom'
import {wall, getCookie} from './../../serverFetch'
import Messagecomp from './Messagecomponent'

export default function Messages() {
    
    const [msgArray, setMsgArray] = React.useState([]);
    const [flag1, setFlag1] = React.useState(false);

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
            setFlag1(true)
        })
    
    }, [])


    
    return (
        <div>
            <h2>MESSAGES:</h2>
            {flag1 && msgArray.map((elem) => {
                return(<Messagecomp key={'mc' + elem.time} time={elem.time} msg={elem.msg} sender={elem.sender} />)
                //return(<li key={elem.time}>{elem.msg}</li>)
            })}
        </div>
    )
}