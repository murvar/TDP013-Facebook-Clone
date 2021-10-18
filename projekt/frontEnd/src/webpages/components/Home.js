import React from 'react'
import {useHistory} from 'react-router-dom';

export default function Home() {

    let history = useHistory()

    const sendHome = async (e) => {
        e.preventDefault()
        history.push('/') 
      }

    return (
        <div>
      <form>
        <button onClick={sendHome}
          type="submit" 
          id="homebutton">
          Home
        </button>
      </form>
    </div>
    )
}