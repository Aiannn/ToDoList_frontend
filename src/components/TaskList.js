import React from 'react'
import Task from './Task'

class TaskList extends React.Component {

    getTaskList = () => {
        return this.props.tasks.map((task,index) => {
            return <Task deleteTask={this.props.deleteTask} showDeleteButtons={this.props.showDeleteButtons} key ={index} task={task} />
        })
    }

    render () {
        return (
            <div>
                {this.getTaskList()}
            </div>
        )
    }
}

export default TaskList
