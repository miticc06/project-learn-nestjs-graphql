import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

import { Menu, Icon, Layout } from "antd";
const { Sider } = Layout;

const mainNavigation = props => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Icon type="home" />
                    <span className="nav-text">Homepage</span>
                    <NavLink to="/"></NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="user" />
                    <span className="nav-text">Auth</span>
                    <NavLink to="/Auth"></NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="thunderbolt" />
                    <span className="nav-text">Events</span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="carry-out" />
                    <span className="nav-text">Bookings</span>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}


/*



const mainNavigation = props => {
    return (

        <header className="main-navigation">

            <div className="main-navigation__logo">
                Easy Event
            </div>

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


*/

export default mainNavigation;