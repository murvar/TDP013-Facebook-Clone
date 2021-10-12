import React, { Component } from 'react'
import {useHistory} from 'react-router-dom';
import Wallprofile from './components/Wallprofile';
import Logout from './components/Logout';

let serverFetch = require("./../serverFetch.js")

export default function Profile() {
    return (
        <div>
            <Wallprofile />
            <Logout />
        </div>
    )
}
