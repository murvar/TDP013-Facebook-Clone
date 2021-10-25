import React from 'react'

export default function Friendcomponent(props) {
    return (
        <div>
            <a id="friend-name" href={"/profile/" + props.name}>{props.name}</a>
        </div>
    )
}
