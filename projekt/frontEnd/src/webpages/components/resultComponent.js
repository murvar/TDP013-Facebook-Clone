import React from 'react'
import {toggleFriendRequest} from './../../serverFetch'
import { Row, Col } from 'react-bootstrap';

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
            console.log("Checking sentRequestsArray")
            console.log(props.sentRequestsArray)
            console.log(props.element.userID)
            setFirstTimeFlag(false)
        }
    }, [])

    return (
        <div>
            {(() => {
                if (props.friendsArray.includes(props.element.userID)) {
                    return (
                        <div className='result'>
                            <Row>
                            <Col>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" className="result-img"/>
                            </Col>
                            <Col>
                            <a href={"/profile/" + props.element.userID}><h3>{props.element.userID}</h3></a>
                            </Col>
                            <Col>
                            <p>Already friends</p>
                            </Col>
                            </Row>
                        </div>
                    )
                } else {
                    return (
                        <div  className='result'>
                            <Row>
                            <Col>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" className="result-img"/>
                            </Col>
                            <Col>
                            <h3>{props.element.userID}</h3>
                            </Col>
                            <Col>
                            <form>
                                <label>
                                    Add friend
                                </label>
                                <input
                                    name="Add friend"
                                    type="checkbox"
                                    id={"checkbox" + props.element.userID}
                                    checked={checkboxToggle}
                                    onChange={(e) => toggleFriendRequestHandler(e, props.element.userID)}
                                    />
                            </form>
                            </Col>
                            </Row>
                        </div>
                    )
                }
            })()}
        </div>
    )
}
