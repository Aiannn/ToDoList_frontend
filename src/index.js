import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignUp from './components/SignUp'

ReactDOM.render((
    <Router>
        <div>
            <NavBar />
            <Route exact path='/' component={App} />
            <Route exact path='/signup' component={SignUp} />
        </div>
    </Router>), 
    document.getElementById('root'));
