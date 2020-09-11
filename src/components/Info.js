import React from 'react'
import {Redirect} from 'react-router-dom'
import '../Info.css'
import {withRouter} from 'react-router-dom'

class Info extends React.Component {
    render() {
        return (
            <React.Fragment>
                {window.localStorage.length > 0? 
                    <div className="info-body">
                        <p>Welcome to Daily Task app!</p>
                        <p>This app helps you build your daily tasks.</p>
                        <p>You're able to set up timer to each of your tasks. (In next Update)</p>
                    </div>
                    :
                    <Redirect to="/signup"/>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(Info)