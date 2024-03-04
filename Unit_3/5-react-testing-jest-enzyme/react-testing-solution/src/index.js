import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ToDo from './components/ToDos/ToDos'
import registerServiceWorker from './registerServiceWorker'

const listItems = [
  {task: 'create lesson', done: false },
  {task: 'clean apartment', done: false }
]

ReactDOM.render(<ToDo tasks={listItems} />, document.getElementById('root'))
registerServiceWorker()
