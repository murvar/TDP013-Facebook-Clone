import React from 'react'
import { useParams } from 'react-router-dom'
import {postMsg, getCookie} from './../../serverFetch.js'
import {useHistory} from 'react-router-dom';

export default function postOnWall() {

  let history = useHistory()
  let userID = useParams().id
  if (userID == null) {userID = getCookie("userID")}
  let sessionID = getCookie("sessionID")

  const postHandler = async (e) => {
    e.preventDefault()
    let msg = document.getElementById("postMSG").value
    postMsg(userID, sessionID, msg)
    if (userID === getCookie("userID")) {
      history.push('/')
    } else {
      history.push('/profile/' + userID)  
    }
  }


  return (
    <div id='postonwall'>
      <form>
        <input
          type="text"
          name="Message"
          placeholder="Write a message!"
          id="postMSG"
        />

        <button onClick={postHandler}
          type="submit" 
          id="postbutton">
          <i className="far fa-paper-plane"></i>
          Post
        </button>
      </form>
    </div>
  )
}
