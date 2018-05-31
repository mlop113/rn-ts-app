import * as React from 'react'
import MovieSearchScreen from './'

import * as renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<MovieSearchScreen />).toJSON()
  expect(rendered).toBeTruthy()
})
