import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
    </Switch>
)