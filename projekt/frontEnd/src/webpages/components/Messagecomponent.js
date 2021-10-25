import React from 'react'

export default function Messagecomp(props) {

    return(
        <div className="containerr">
            <img src="https://img.favpng.com/15/8/8/user-profile-2018-in-sight-user-conference-expo-business-default-png-favpng-5EdhQJprgN1HKZdx50LCN4zXg.jpg" alt="avatar"/>
            <strong> {props.sender} </strong>
            <p>{props.msg}</p>
            <span className="time-right">{props.time}</span>
        </div>
    )
}
