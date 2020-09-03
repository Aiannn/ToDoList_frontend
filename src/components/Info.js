import React from 'react'
import {Redirect} from 'react-router-dom'

class Info extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.user? 
                    <div>
                        <p>Welcome to Daily Task app!</p>
                        <p>This app helps you build your daily tasks.</p>
                        <p>You're able to set up timer to each of your tasks.</p>
                    </div>
                    :
                    <Redirect to="/"/>
                }
            </React.Fragment>
        )
    }
}

export default Info