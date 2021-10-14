import React from 'react'
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom'

export default function Searchfield() {
    let history = useHistory()
    const searchValue = useParams().searchValue

    const searchHandler = async (e) => {
        e.preventDefault()
        let searchValue = document.getElementById("searchValue").value
        history.push('/search/' + searchValue)  
      }

    return (
        <div>
            <form>
                <input
                type="text"
                name="Message"
                id="searchValue"
                defaultValue={searchValue}
                required/>

                <button onClick={searchHandler}
                type="submit" 
                id="postbutton">
                Search
                </button>
            </form>
        </div>
    )
}
