import React from 'react'
import {useHistory} from 'react-router-dom';
import {getCookie} from './../../serverFetch'

export default function Home() {

    let history = useHistory()
    if (getCookie("sessionID") == "") {
      history.push('/login') 
    }

    const sendHome = async (e) => {
        e.preventDefault()
        history.push('/') 
      }

    return (
        <div>
      <form>
        <button onClick={sendHome}
          type="submit" 
          id="homebutton"
          className="btn">
            <i className="fas fa-home"></i>
          Home
        </button>
      </form>
    </div>
    )
}
