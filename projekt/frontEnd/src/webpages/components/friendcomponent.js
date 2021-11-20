import React from 'react'

export default function Friendcomponent(props) {
    return (
        <div className="friend-div">
            <a className="friend-name" href={"/profile/" + props.name}>{props.name.substring(0, 2)}</a>
        </div>
        
        
    )
}
