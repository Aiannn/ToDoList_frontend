import React from 'react';
import './MyTasks.css';
import { CATEGORIES } from './data'
import TaskList from './components/TaskList'
import CategoryFilters from './components/CategoryFilters'
import StretchToggle from './components/StretchToggle'
import TaskForm from './components/TaskForm'
import {Redirect} from 'react-router-dom'

class MyTasks extends React.Component {

  state = {
    showStretchFeatures: false,
    selectedCategory: 'All',
    tasks: []
  }

  componentDidMount() {
    this.getAPI()
  }

  updateTask = (updTask, text) => {

    let obj = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'applciation/json'
      },
      body: JSON.stringify({
        id: updTask.id,
        text: text 
      })
    }

    fetch(`http://localhost:3000/tasks/${updTask.id}`, obj)
    .then(response => response.json())
    .then(updTask => {
      console.log(updTask)    
      // this.setState({
      //   tasks: [...this.state.tasks]
      // })       
    })

    // window.location.reload() //refreshes page

  }

  getAPI = () => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      .then(response=>response.json())
      .then(data => {
        console.log(data.user.tasks)
        this.setState({
          tasks: data.user.tasks
        })
      })
    }
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
    // this.setState({
    //   tasks: [...this.state.tasks, task]
    // }) OPTIMISTIC RENDERING DOESN'T WORK BECAUSE, THE NEW TASK DOESN'T HAVE AN ID, ON WHICH DELETE METHOD RELY

    let obj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        text: task.text,
        category: task.category,
        username: this.props.user.username 
      })
    }

    fetch('http://localhost:3000/tasks', obj)
    .then(resp => resp.json())
    .then(task => {
      console.log(task)
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    })
  }

  deleteTask = task => {
    this.setState({
      tasks: this.state.tasks.filter(
        t => !(t.text === task.text && t.category===task.category)
      )
    })

    let obj = {
      method: 'DELETE'
    }

    fetch(`http://localhost:3000/tasks/${task.id}`, obj)
  }

  filterArray = () => 
    this.state.tasks.filter(task =>
      this.state.selectedCategory === 'All' ||
      task.category === this.state.selectedCategory
    )

  render() {

    const tasks = this.filterArray()

    return (
        <React.Fragment>
          {window.localStorage.length > 0 ? 
          <div className="App">
            <StretchToggle showStretchFeatures={this.state.showStretchFeatures} switchStretchFeatures={this.switchStretchFeatures} />
            <h2>My tasks</h2>
            <CategoryFilters selectedCategory={this.state.selectedCategory} setCategory={this.setCategory} categories={CATEGORIES}/>
            <div className="tasks">
              <h5>Tasks</h5>
              {this.state.showStretchFeatures? <TaskForm addTask={this.addTask} />:null}
              <TaskList updateTask={this.updateTask} deleteTask={this.deleteTask} showStretchFeatures={this.state.showStretchFeatures} tasks={tasks}/>
            </div>
          </div>
          :
          <Redirect to="/signup"/>
          }
        </React.Fragment>
    )
  }
}


export default MyTasks;

