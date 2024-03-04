import React, { Component } from 'react'

import ToDo from './ToDo'

class ToDos extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newTodo: '',
      toDos: this.props.tasks
    }
  }

  handleChange = e => {
    this.setState({
      newTodo: e.target.value
    })
  }

  createToDo = e => {
    this.setState(prevState => ({
      newTodo: '',
      toDos: [...prevState.toDos, 
             { task: prevState.newTodo, done: false }]
    }))
  }

  markComplete = todo => {
    this.setState(prevState => ({
      toDos: prevState.toDos.map(item => {
        if (item == todo) item.done = !item.done
        return item
      })
    }))
  }

  render () {
    return (
      <div>
        <input onChange={this.handleChange}/>
        <button onClick={this.createToDo} className='new-todo'>create</button>
        {this.state.toDos.map((task, idx) => 
          <ToDo task={task} markComplete={this.markComplete} key={idx} />
        )}
      </div>
    )
  }
}

export default ToDos
