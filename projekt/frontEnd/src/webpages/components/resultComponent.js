import React from 'react'
import {search, toggleFriendRequest, getCookie, friends, getMySentRequests} from './../../serverFetch'

export default function ResultComponent(props) {

    const [checkboxToggle, setCheckboxToggle] = React.useState(Boolean);
    const [firstTimeFlag, setFirstTimeFlag] = React.useState(true);

    const toggleFriendRequestHandler = async (e, userID) => {
        //Callback function removing or adding friendrequests for user and sessionID
        toggleFriendRequest(userID, props.sessionID)
        .then(res => {
            return res
        })
        .then(data => {
            setCheckboxToggle(!checkboxToggle)
        })
    }

    React.useEffect(() => {
        if(firstTimeFlag) {
            setCheckboxToggle(props.sentRequestsArray.includes(props.element.userID))
            setFirstTimeFlag(false)
        }
    }, [])

    return (
        <div>
            {(() => {
                if (props.friendsArray.includes(props.element.userID)) {
                    return (
                        <div>
                            <a href={"/profile/" + props.element.userID}>{props.element.userID}</a>
                            <p>already friends</p>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <p>{props.element.userID}</p>
                            <form>
                                <label>
                                    Add friend:
                                    {/* IMPORTANT PART OF HTML HERE*/}
                                    <input
                                        name="Add friend"
                                        type="checkbox"
                                        id={"checkbox" + props.element.userID}
                                        checked={checkboxToggle}
                                        onChange={(e) => toggleFriendRequestHandler(e, props.element.userID)}
                                        />
                                </label>
                            </form>
                        </div>
                    )
                }
            })()}
        </div>
    )
}
