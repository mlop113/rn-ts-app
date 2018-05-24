import { call } from 'redux-saga/effects'

// process STARTUP actions
export function* startup() {
  yield call(console.log, 'startup')
}
