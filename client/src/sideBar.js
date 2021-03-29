import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
    <div className="sideBar">
        <div className="sideBarDivCss">
            <Link to="/">Chat</Link>
        </div>
        <div>
            <Link to="/game">Game</Link>
        </div>
    </div>
);

export default SideBar;
