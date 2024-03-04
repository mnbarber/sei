import React from 'react'
import { mount } from 'enzyme'

import ToDos from './ToDos'
import ToDo from './ToDo'

describe('ToDos Component', () => {
  const listItems = [
    { task: 'create lesson', done: false },
    { task: 'clean apartment', done: false }
  ]

  let component
  beforeEach(() => {
    component = mount(<ToDos tasks={listItems} />)
  })

  it('Should contain two todo subcomponents', () => {
    expect(component.find(ToDo).length).toBe(2)
  })

  it('Should render the todo list tasks', () => {
    component.find(ToDo).forEach((todo, idx) => {
      expect(todo.find('.task-name').text()).toBe(listItems[idx].task)
    })
  })

  it(`Should have have a state attribute for the new todo that should update 
      when the user types in an input`, () => {
    component.find('input').simulate('change', {target: {value: 'hello'}})
    expect(component.state('newTodo')).toBe('hello')
  })

  it(`Should create a new todo on the click of a button and update the
    UI with it`, () => {
    component.find('.new-todo').simulate('click')
    expect(component.state('toDos').length).toBe(3)
    expect(component.find(ToDo).length).toBe(3)
  })

  it('Should mark todos as done on the click of a button', () => {
    component.find('.mark-done').at(0).simulate('click')
    expect(component.state('toDos').filter(task => task.done).length).toBe(1)
  })

  it('Should have todos with the class checked if they are done and unchecked if they are not done', () => {
    let todos = component.state('toDos')
    component.find(ToDo).forEach((todo, idx) => {
      expect(todo.find('.task-name').hasClass(todos[idx].done ? 'checked' : 'unchecked')).toBe(true)
    })
  })
})
