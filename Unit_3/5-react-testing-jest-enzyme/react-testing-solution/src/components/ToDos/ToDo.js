import React from 'react'

const ToDo = ({ task, markComplete }) => {
  return (
    <div>
      <button className='mark-done' onClick={e => markComplete(task)}>Mark as Complete</button>
      <div className={`task-name ${task.done ? 'checked' : 'unchecked'}`}>{task.task}</div>
    </div>
  )
}

export default ToDo
