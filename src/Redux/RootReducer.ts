import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { reducer } from './Navigation'

/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  nav: reducer,
})

export type RootState = StateType<typeof rootReducer>
export default rootReducer
