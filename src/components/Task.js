import React from 'react'

class Task extends React.Component {

    render() {
        return (
            <div className="task">
                <div className="label">{this.props.task.category}</div>
                <div className="text">{this.props.task.text}</div>
                {
                    this.props.showDeleteButtons? <button onClick={(task) =>this.props.deleteTask(this.props.task)} className='delete'>X</button>:null
                }
            </div>
        )
    }
}

export default Task