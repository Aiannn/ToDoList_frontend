import React from 'react'
import {CATEGORIES} from '../data'

class TaskForm extends React.Component {

    state = {
        task: '',
        category: 'Code'
    }

    submitHandler = (e) => {
        e.preventDefault()
        let task = {
            text: this.state.task,
            category: this.state.category
        }

        this.props.addTask(task)
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getCategories = () => {
        return CATEGORIES.filter(category => category!=='All')
        .map(category => <option key={category}>{category}</option>)
    }

    render() {
        return (
            <form className="new-task-form" onSubmit={e => this.submitHandler(e)}>
                <input onChange={e => this.changeHandler(e)} name="task" value={this.state.task} placeholder="New task details" type="text" />
                <select onChange={e => this.changeHandler(e)} name="category" value={this.state.category}>
                    {
                        this.getCategories()
                    }
                </select>
                <input type="submit" />
            </form>
        )
    }
}

export default TaskForm