import { NavigationState } from 'react-navigation'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { Action, applyMiddleware, compose, createStore, Reducer } from 'redux'
import createSagaMiddleware from 'redux-saga'
import Config from '../Config/DebugConfig'
import ReduxPersist from '../Config/ReduxPersist'
import Rehydration from '../Services/Rehydration'

interface IState {
  nav: NavigationState
}

// creates the store
export default (
  rootReducer: Reducer<{}, Action<any>>,
  rootSaga: () => Iterator<any>
) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    (state: IState) => state.nav
  )
  middleware.push(navigationMiddleware)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron
    ? console.tron.createSagaMonitor()
    : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron
    ? console.tron.createStore
    : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  const sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware,
  }
}
