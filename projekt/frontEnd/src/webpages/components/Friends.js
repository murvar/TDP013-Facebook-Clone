import React from 'react';
import {friends, getCookie} from './../../serverFetch';
import Friendcomponent from './friendcomponent';


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
        <div id="friends">
            <h3 id="friendTitle">Friends:</h3>
            {friendArray && friendArray.map((elem) => {
                // return (
                //     <div className="friend" key={elem}>
                //     <a href={"/profile/" + elem}>{elem}</a>
                //     </div>
                //     )
                return(<Friendcomponent key={elem} name={elem}/>)
                
                })}
        </div>
    )
}