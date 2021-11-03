import React from 'react'

export default function Messagecomp(props) {

    return(
        <div className="containerr">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar"/>
            <strong> {props.sender} </strong>
            <p>{props.msg}</p>
            <span className="time-right">{props.time}</span>
        </div>
    )
}
