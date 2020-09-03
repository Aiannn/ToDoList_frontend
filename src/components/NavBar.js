import React from 'react'
import { NavLink } from 'react-router-dom'

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <NavLink to='/'>
                    Home
                </NavLink>
                <NavLink to='/info'>
                    Info
                </NavLink>
                <NavLink to='/menu'>
                    Menu
                </NavLink>
                <NavLink to='/signup'>
                    SignUp
                </NavLink>
            </div>
        )
    }
}

export default NavBar