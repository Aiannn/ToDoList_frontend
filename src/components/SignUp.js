import React from 'react'

class SignUp extends React.Component {
    render() {
        return(
            <div>
                <h2>SignUp</h2>
                <form>
                    <input type="text" placeholder="Enter Username"/>
                    <input type="text" placeholder="Enter Password"/>
                </form>
            </div>
        )
    }
}

export default SignUp
