import React from 'react'

class User extends React.Component {
    render() {
        return (
            <div>
                Welcome, {this.props.currentUser.username}
            </div>
        )
    }
}

export default User