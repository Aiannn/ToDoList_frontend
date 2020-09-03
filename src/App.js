import React from 'react'
import MyTasks from './MyTasks';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import Info from './components/Info'
import User from './components/User'

class App extends React.Component {

    state = {
        user: true
    }

    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route exact path='/' component={MyTasks} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/info' render={() => <Info user={this.state.user}/>} />
                    <Route exact path='/user' component={User} />
                </div>
            </Router>
        )
    }
}

export default App