import { NavigationAction, NavigationState } from 'react-navigation'
import { AnyAction } from 'redux'
import AppNavigation from '../Navigation/AppNavigation'

export const reducer = (state: NavigationState, action: NavigationAction) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}
