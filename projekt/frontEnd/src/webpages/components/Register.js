import React from 'react'
import {useHistory} from 'react-router-dom';

export default function Register() {

    let history = useHistory()

    const sendReg = async (e) => {
        e.preventDefault()
        history.push('/register') 
      }

    return (
        <div>
      <form>
        <button onClick={sendReg}
          type="submit" 
          id="regbutton">
          Register Account
        </button>
      </form>
    </div>
    )
}
