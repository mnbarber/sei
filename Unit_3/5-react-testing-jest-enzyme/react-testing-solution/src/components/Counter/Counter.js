import React, { Component } from 'react'

class Counter extends Component {
  constructor() {
    super()
    this.state = {
      number: 0
    }
  }
  
  add = () => {
    this.setState(prevState => {number: prevState.number++})
  }

  minus = () => {
    this.setState(prevState => {number: prevState.number--})
  }

  render () {
    return (
      <div>
        <h1>Counter</h1>
        <button className='plus' onClick={this.add}>+</button>
        <span className='number'>{this.state.number}</span>
        <button className='minus' onClick={this.minus}>-</button>
      </div>
    )
  }
}

export default Counter
