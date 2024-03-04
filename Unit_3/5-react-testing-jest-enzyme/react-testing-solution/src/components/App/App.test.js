import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('App component', () => {
  it('should render as expected', () => {
    const component = shallow(<App name={'Ali'} />)
    expect(component.contains('Ali')).toBe(true)
  })
})
