import React from 'react'
import '../User.css'
import {Redirect} from 'react-router-dom'

class User extends React.Component {

    state = {
        avatar: '',
        bio: '',
        quoteValue: '',
        displayEditing: false,
        displayEditingQuotes: false
    }


    displayEditingQuotes = () => {
        this.setState({
            displayEditingQuotes: !this.state.displayEditingQuotes
        })
    }

    displayEditingHandler = () => {
        this.setState({
            displayEditing: !this.state.displayEditing
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        
        const token = localStorage.getItem("token")
        if (token) {
            fetch('http://localhost:3000/api/v1/profile', {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    avatar: this.state.avatar,
                    bio: this.state.bio,
                    username: this.props.currentUser.username
                })
            }) 
            .then(response=>response.json())
            .then(data => {
                console.log(data)
                this.props.renderUserInfo(data)
            })

        }
    }
    
    formSubmitHandler = (e) => {
        e.preventDefault()

        let obj = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.props.currentUser.username,
                name: this.state.quoteValue
            })
        }
        
        fetch('http://localhost:3000/quotes', obj)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.addQuote(data)
        })
        //window.location.reload()
    }

    // getQuotes = () => {
    //     return this.props.currentUser.quotes.map(quote => {
    //         return <li key={quote.name} >{quote.name}</li>
    //     })
    // }

    getQuotes = () => {
        return this.props.quotes.map(quote => {
            return <li key={quote.name} >{quote.name}</li>
        })
    }

    render() {
        return (
            <React.Fragment>
                {window.localStorage.length > 0?
                <div className="body">
                    <h4>Welcome, {this.props.currentUser.username}</h4>
                    <div>
                        {this.props.currentUser.avatar ? 
                            <div className="Ava-container"><img src={this.props.currentUser.avatar} alt="ava"/></div>
                            :
                            <div className="Ava-container"><img src="https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png" alt="Empty avatar" /></div>
                        }

                        <div className="bio-container">
                            <h4>Bio:</h4>
                            {this.props.currentUser.bio ?
                            <div>{this.props.currentUser.bio}</div>
                            :
                            <div>Tell us about yourself...</div>
                            }   
                        </div>

                        <div>
                            <button className="user-button" onClick={this.displayEditingHandler}>Edit Profile</button>
                        </div>
                    </div>
                    
                    
                    {this.state.displayEditing? 
                        <div>
                            <form onSubmit={this.submitHandler}>
                                <label>Avatar:</label>
                                <input type="text" value={this.state.avatar} onChange={this.changeHandler} name="avatar" placeholder="Enter avatar link" />
                                <label>Bio:</label>
                                <input type="text" value={this.state.bio} onChange={this.changeHandler} name="bio" placeholder="Enter your bio" />
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                        :
                        null
                    }


                    <div className="quotes-container">
                        <h4>Favorite quotes:</h4>
                        {this.props.quotes ? //here this.props.currentUser.quotes
                            <ul>{this.getQuotes()}</ul>
                            :
                            <div>No quotes yet...</div>
                        }
                    </div>
                    
                    <div>
                        <button className="user-button" onClick={this.displayEditingQuotes}>Add Quote</button>
                    </div>

                    {this.state.displayEditingQuotes?
                        <div>
                            <form onSubmit={this.formSubmitHandler}>
                                <input type="text" name="quoteValue" value={this.state.quoteValue} placeholder="Add quotes here" onChange={this.changeHandler} />
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                        :
                        null 
                    }
                </div>
                :
                <Redirect to='/signup'/>
                }
            </React.Fragment>
        )
    }
}

export default User
                    
                    