import React from 'react'
import Task from './Task'

class TaskList extends React.Component {

    getTaskList = () => {
        return this.props.tasks.map((task,index) => {
            return <Task updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} showStretchFeatures={this.props.showStretchFeatures} key ={index} task={task} />
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
