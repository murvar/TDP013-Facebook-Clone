import React from 'react'
import { Row, Col } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';

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
                placeholder="Search on Tvittter"
                defaultValue={searchValue}
                required/>

                <button onClick={searchHandler}
                type="submit" 
                id="postbutton">
                <i className="fas fa-search"></i>
                Search
                </button>
            </form>
        </div>
    )
}
