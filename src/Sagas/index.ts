import { all, takeLatest } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import DebugConfig from '../Config/DebugConfig'
import api from '../Services/Api'

/* ------------- Types ------------- */

import MovieActions from '../Redux/Movie'
import StartupActions from '../Redux/Startup'

/* ------------- Sagas ------------- */

import { searchMoviesSaga } from './Movie'
import { startup } from './Startup'

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(getType(StartupActions.startup), startup),
    takeLatest(getType(MovieActions.searchMovies), searchMoviesSaga, api),
  ])
}
