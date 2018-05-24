import { NavigationState } from 'react-navigation'
import { AnyAction, combineReducers, Reducer } from 'redux'
import { BaseReducer, persistReducer } from 'redux-persist'
import ReduxPersist from '../Config/ReduxPersist'
import rootSaga from '../Sagas/'
import configureStore from './CreateStore'

export interface IApplicationState {
  nav: NavigationState
}

/* ------------- Assemble The Reducers ------------- */
export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  nav: require('./Navigation').reducer,
})

// REALLY do not like how I resorted to doing `as any` for a bunch of stuff here...

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    // Seems to be a bug in redux-persist types so all this `| undefined` is needed?
    finalReducers = persistReducer<IApplicationState | undefined, AnyAction>(
      persistConfig,
      reducers as BaseReducer<IApplicationState, AnyAction>
    )
  }

  const configureResult = configureStore(
    finalReducers as Reducer<{}, AnyAction>,
    rootSaga
  )

  const { store, sagaMiddleware } = configureResult
  let { sagasManager } = configureResult

  const m: any = module as any
  if (m.hot) {
    m.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
