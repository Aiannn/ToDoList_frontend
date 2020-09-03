import React from 'react';
import './MyTasks.css';
import { CATEGORIES } from './data'
import TaskList from './components/TaskList'
import CategoryFilters from './components/CategoryFilters'
import StretchToggle from './components/StretchToggle'
import TaskForm from './components/TaskForm'

class MyTasks extends React.Component {

  state = {
    showStretchFeatures: false,
    selectedCategory: 'All',
    tasks: []
  }

  componentDidMount() {
    this.getAPI()
  }

  getAPI = () => {
    fetch('http://localhost:3000/tasks')
    .then(response=>response.json())
    .then(data => {
      this.setState({
        tasks: data
      })
    })
  }

  switchStretchFeatures = () => {
    this.setState({
      showStretchFeatures: !this.state.showStretchFeatures
    })
  }

  setCategory = (selectedCategory) => {
    this.setState({
      selectedCategory: selectedCategory
    })
    this.filterArray()
  }

  addTask = task => {
    this.setState({
      tasks: [...this.state.tasks, task]
    })

    let obj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        text: task.text,
        category: task.category 
      })
    }

    fetch('http://localhost:3000/tasks', obj)
    .then(resp => resp.json())
    .then(task => console.log(task))
  }

  deleteTask = task => {
    this.setState({
      tasks: this.state.tasks.filter(
        t => !(t.text === task.text && t.category===task.category)
      )
    })
  }

  filterArray = () => 
    this.state.tasks.filter(task =>
      this.state.selectedCategory === 'All' ||
      task.category === this.state.selectedCategory
    )

  render() {

    const tasks = this.filterArray()

    return (
        <div className="App">
          <StretchToggle showStretchFeatures={this.state.showStretchFeatures} switchStretchFeatures={this.switchStretchFeatures} />
          <h2>My tasks</h2>
          <CategoryFilters selectedCategory={this.state.selectedCategory} setCategory={this.setCategory} categories={CATEGORIES}/>
          <div className="tasks">
            <h5>Tasks</h5>
            {this.state.showStretchFeatures? <TaskForm addTask={this.addTask} />:null}
            <TaskList deleteTask={this.deleteTask} showDeleteButtons={this.state.showStretchFeatures} tasks={tasks}/>
          </div>
        </div>
    )
  }
}


export default MyTasks;

