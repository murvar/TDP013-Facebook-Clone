import React, { Component } from 'react'
import {useHistory} from 'react-router-dom';
import {Wallprofile} from './components/Wallprofile';
let serverFetch = require("./../serverFetch.js")

export default function home() {
    return (
        <div>
            <Wallprofile  />
        </div>
    )
}
