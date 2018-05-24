import { all, takeLatest } from 'redux-saga/effects'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import StartupActions from '../Redux/Startup'

/* ------------- Sagas ------------- */

import { startup } from './Startup'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

// Should BLE manager or whatever live here?

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([takeLatest(StartupActions.startup, startup)])
}
