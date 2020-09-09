import React from 'react'
import '../User.css'

class User extends React.Component {

    state = {
        avatar: '',
        bio: '',
        quoteValue: ''
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
        })
        window.location.reload()
    }

    getQuotes = () => {
        return this.props.currentUser.quotes.map(quote => {
            return <li key={quote.name} >{quote.name}</li>
        })
    }

    render() {
        return (
            <div>
                <div>Welcome, {this.props.currentUser.username}</div>
                <div>
                    <span>Account data:</span>
                    {this.props.currentUser.avatar ? 
                        <div className="Ava-container"><img src={this.props.currentUser.avatar} alt="ava"/></div>
                        :
                        <div className="Ava-container"><img src="https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png" alt="Empty avatar" /></div>
                    }
                    {this.props.currentUser.bio ?
                        <div>{this.props.currentUser.bio}</div>
                        :
                        <div>Tell us about yourself...</div>
                    }
                </div>

                <div>
                    <form onSubmit={this.submitHandler}>
                        <label>Avatar:</label>
                        <input type="text" value={this.state.avatar} onChange={this.changeHandler} name="avatar" placeholder="Enter avatat link" />
                        <label>Bio:</label>
                        <input type="text" value={this.state.bio} onChange={this.changeHandler} name="bio" placeholder="Enter your bio" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div className="quotes-container">
                    <h4>Favorite quotes:</h4>
                    {this.props.currentUser.quotes ?
                        <ul>{this.getQuotes()}</ul>
                        :
                        <div>No quotes yet...</div>
                    }
                </div>

                <div>
                    <form onSubmit={this.formSubmitHandler}>
                        <input type="text" name="quoteValue" value={this.state.quoteValue} placeholder="type qoutes" onChange={this.changeHandler} />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default User
                    
                    