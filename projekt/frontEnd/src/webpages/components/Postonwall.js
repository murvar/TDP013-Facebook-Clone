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
    postMsg(userID.id, "674b93fc-2fe0-43fd-ae9d-2e4637ac617e", msg)
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
