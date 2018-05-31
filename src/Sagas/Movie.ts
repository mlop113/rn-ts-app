import { ApiOkResponse } from 'apisauce'
import Config from 'react-native-config'
import { call, put } from 'redux-saga/effects'
import MovieActions, { IMovie } from '../Redux/Movie'
import { API } from '../Services/Api'

export function* searchMoviesSaga(
  { searchMovies }: API,
  { payload }: { payload: string }
) {
  try {
    const response: ApiOkResponse<any> = yield call(searchMovies, payload)

    const movies: IMovie[] = response.data.results.map((r: any) => {
      return {
        id: r.id,
        posterPath: Config.THUMB_BASE_URI + r.poster_path,
        overview: r.overview,
        releaseDate: r.release_date,
        title: r.title,
        backdropPath: Config.BACKGROUND_BASE_URI + r.backdrop_path,
        popularity: r.popularity,
        voteAverage: r.vote_average,
      } as IMovie
    })
    yield put(MovieActions.searchMoviesSuccess(movies))
  } catch (error) {
    console.tron.log(error)
  }
}
