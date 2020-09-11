import React from 'react'

class Task extends React.Component {

    state = {
        editing: false,
        taskValue : this.props.task.text
    }

    changeState = () => {
        this.setState({
            editing: !this.state.editing
        })
        console.log(this.state.editing)
    }

    changeHandler = (e) => {
        this.setState({
            taskValue: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.updateTask(this.props.task, this.state.taskValue)
        this.setState({
            editing: !this.state.editing
        })
    }

    render() {
        return (
            <div className="task">
                <div className="label">{this.props.task.category}</div>
                {
                    this.state.editing ? 
                    <form onSubmit={this.submitHandler}>
                        <input type="text" value={this.state.taskValue} onChange={this.changeHandler}/>
                        <input type="submit" value="Submit" />
                    </form>
                    :
                    <div className="text">{this.state.taskValue}</div>
                }
                {
                    this.props.showStretchFeatures? 
                    <React.Fragment>
                        <button onClick={() =>this.props.deleteTask(this.props.task)} className='delete'>X</button>
                        <button onClick={this.changeState}>EDIT</button>
                    </React.Fragment>
                    :
                    null
                }
            </div>
        )
    }
}

export default Task