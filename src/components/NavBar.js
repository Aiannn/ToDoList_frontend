import React from 'react'
import { NavLink } from 'react-router-dom'
import '../NavBar.css'

class NavBar extends React.Component {
    render() {
        return (
            <div id="container">
                <NavLink to='/'>
                    <div className="option">My Tasks</div>
                </NavLink>
                <NavLink to='/info'>
                    <div className="option">Info</div>
                </NavLink>
                <NavLink to='/signup'>
                    <div className="option">SignUp</div>
                </NavLink>
                <NavLink to='/user'>
                    {this.props.currentUser ? 
                        <div className="option">{this.props.currentUser.username}</div>
                        :
                        <div className="option">User</div>
                    }
                </NavLink>
                {this.props.currentUser ? 
                    <div className="option" onClick={this.props.clickHandler}>Log Out</div>
                    :
                    <NavLink to='/login'>
                        <div className="option">LogIn</div>
                    </NavLink>
                }
            </div>
        )
    }
}

export default NavBar