import React from 'react';
import { NavLink } from 'react-router-dom';


const mainNavigation = props => {
    return (
        <header>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/auth">Auth</NavLink>
                </li>

            </ul>

        </header>
    );
}

export default mainNavigation;