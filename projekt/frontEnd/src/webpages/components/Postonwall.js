import React from 'react'
import { useParams } from 'react-router-dom'
import { postMsg } from './../../serverFetch.js'
import {useHistory} from 'react-router-dom';

export default function postOnWall() {

  let history = useHistory()
  const userID = useParams()

  const postHandler = async () => {
    let msg = document.getElementById("postMSG").value
    console.log(document.cookie)
    postMsg(userID.id, "c7c8f3e7-a35c-4919-a49d-a108cf7c8c53", msg)
    history.push('/profile/' + userID.id)
    //<Redirect  to="/" />
    //console.log(document.cookie)
    
  }


  return (
    <div>
      <form>
        <input
          type="text"
          name="Message"
          defaultValue="Write a message!"
          id="postMSG"
        />

        <button onClick={postHandler}
          type="submit" 
          id="postbutton">
          Post
        </button>
      </form>
    </div>
  )
}
