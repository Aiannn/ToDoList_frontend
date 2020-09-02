import React from 'react';
import './App.css';
import { CATEGORIES } from './data'
import TaskList from './components/TaskList'
import CategoryFilters from './components/CategoryFilters'
import StretchToggle from './components/StretchToggle'
import TaskForm from './components/TaskForm'

class App extends React.Component {

  state = {
    showStretchFeatures: false,
    selectedCategory: 'All',
    tasks: [
      {
        text: 'Buy rice',
        category: 'Food'
      },
      {
        text: 'Save a tenner',
        category: 'Money'
      },
      {
        text: 'Build a todo app',
        category: 'Code'
      },
      {
        text: 'Build todo API',
        category: 'Code'
      },
      {
        text: 'Get an ISA',
        category: 'Money'
      },
      {
        text: 'Cook rice',
        category: 'Food'
      },
      {
        text: 'Tidy house',
        category: 'Misc'
      }
    ]
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
    );
  }
}


export default App;
