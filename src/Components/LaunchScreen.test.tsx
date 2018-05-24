import * as React from 'react'
import LaunchScreen from './LaunchScreen'

import * as renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<LaunchScreen />).toJSON()
  expect(rendered).toBeTruthy()
})
