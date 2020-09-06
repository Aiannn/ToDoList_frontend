import React from 'react'
import { NavLink } from 'react-router-dom'

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <NavLink to='/'>
                    <span>My Tasks</span>
                </NavLink>
                <NavLink to='/info'>
                    <span>Info</span>
                </NavLink>
                <NavLink to='/signup'>
                    <span>SignUp</span>
                </NavLink>
                <NavLink to='/user'>
                    <span>User</span>
                </NavLink>
                {this.props.currentUser ? 
                    <span onClick={this.props.clickHandler}>Log Out</span>
                    :
                    <NavLink to='/login'>
                        LogIn
                    </NavLink>
                }
            </div>
        )
    }
}

export default NavBar