import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { reducer as movie } from './Movie'
import { reducer } from './Navigation'

/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  nav: reducer,
  movie,
})

export type RootState = StateType<typeof rootReducer>
export default rootReducer
