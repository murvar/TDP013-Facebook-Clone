import React from 'react'
import {useParams} from 'react-router-dom'
import {search, toggleFriendRequest, getCookie, friends, getMySentRequests} from './../../serverFetch'

export default function Searchresults() {
    const [searchArray, setSearchArray] = React.useState([]);
    const [friendsArray, setFriendArray] = React.useState([]);
    const [sentRequestsArray, setSentRequestsArray] = React.useState([]);

    const searchValue = useParams().searchValue
    let sessionID = getCookie();
    console.log("SearchValue: " + searchValue)

    React.useEffect(() => {
        search(searchValue)
        .then(res => {
            console.log("running useEffect for search")
            return res
        })
        .then(data => {
            setSearchArray(data)
        })

        friends(sessionID)
        .then(res => {
            console.log("running useEffect for friends")
            return res
        })
        .then(data => {
            setFriendArray(data)
        })

        /* IMPLEMENTERA RÄTT FUNKTIONSNAMN HÄR från SERVERFETCH  */
        getMySentRequests(sessionID)
        .then(res => {
            console.log("running useEffect for mySentRequests")
            return res
        })
        .then(data => {
            setSentRequestsArray(data)
        })
    
    }, [])

    const toggleFriendRequestHandler = async (e, userID) => {
        //e.preventDefault()
        console.log("toggled friend request once")
        toggleFriendRequest(userID, sessionID)
    }


    
    return (
        <div>
            <h2>Search Results:</h2>
            {searchArray && friendsArray && searchArray.map((elem) => {

                return (<div key={elem.userID}>
                        {(() => {
                            if (friendsArray.includes(elem.userID)) {
                                return (
                                    <div>
                                        <a href={"/profile/" + elem.userID}>{elem.userID}</a>
                                        <p>already friends</p>
                                    </div>
                                )
                            } else {
                                return (
                                    <div>
                                        <p>{elem.userID}</p>
                                        <form>
                                            <label>
                                                Add friend:
                                                <input
                                                    name="Add friend"
                                                    type="checkbox"
                                                    id={elem.userID + "checkbox"}
                                                    //defaultChecked={sentRequestsArray.includes(elem.userID)}
                                                    onChange={(e) => toggleFriendRequestHandler(e, elem.userID)}
                                                    />
                                            </label>
                                        </form>
                                    </div>
                                )/*
                                if(sentRequestsArray.includes(elem.userID)) {
                                    document.getElementById(elem.userID).checked = true; 
                                }*/
                            }
                        })()}
                    </div>
                )                                       
            })}
        </div>
    )
}
