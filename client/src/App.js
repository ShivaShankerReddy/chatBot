import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import './app.css';
import SideBar from './sideBar';
import Header from './header';
import Bot from './chatBot';
import Game from './parachute_game';

const App = () => (
    <Router>
        <div>
            <Header />
            <div id="container">
                <SideBar />
                <Switch>
                    <Route exact path="/" component={Bot} />
                    <Route path="/game" component={Game} />
                </Switch>
            </div>
        </div>
    </Router>
);


export default App;
