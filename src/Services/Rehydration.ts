import { AsyncStorage } from 'react-native'
import { Store } from 'redux'
import { persistStore } from 'redux-persist'
import DebugConfig from '../Config/DebugConfig'
import ReduxPersist from '../Config/ReduxPersist'
import StartupActions from '../Redux/Startup'

const updateReducers = (store: Store) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const startup = () => store.dispatch(StartupActions.startup())

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
      if (localVersion !== reducerVersion) {
        // Purge store
        persistStore(store, undefined, startup).purge()
        AsyncStorage.setItem('reducerVersion', reducerVersion)
      } else {
        persistStore(store, undefined, startup)
      }
    })
    .catch(() => {
      persistStore(store, undefined, startup)
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    })
}

export default { updateReducers }
