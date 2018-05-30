import { NavigationState } from 'react-navigation'
import { AnyAction, Reducer } from 'redux'
import { BaseReducer, persistReducer } from 'redux-persist'
import ReduxPersist from '../Config/ReduxPersist'
import rootSaga from '../Sagas/'
import configureStore from './CreateStore'
import rootReducer from './RootReducer'

export default () => {
  let finalReducers = rootReducer
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    // Seems to be a bug in redux-persist types so all this `| undefined` is needed?
    finalReducers = persistReducer(persistConfig, rootReducer as any)
  }

  const configureResult = configureStore(finalReducers as any, rootSaga)

  const { store, sagaMiddleware } = configureResult
  let { sagasManager } = configureResult

  if (module.hot) {
    module.hot.accept(() => {
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
