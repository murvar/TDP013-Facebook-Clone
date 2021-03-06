//file: src/webpages/routing.js
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './home';
import Register from './register';
import Login from './login';
import Search from './search';
import Profile from './profile'
const Webpages = () => {
    return(
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/search/:searchValue" component={Search} />
        </Router>
    );
};
export default Webpages;