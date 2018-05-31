import { combineReducers } from 'redux'
import { ActionType, createStandardAction, getType } from 'typesafe-actions'

export interface IMovie {
  id: number
  posterPath?: string
  overview: string
  releaseDate: string
  title: string
  backdropPath?: string
  popularity: number
  voteAverage: number
}

const actions = {
  searchMovies: createStandardAction('movies/SEARCH')<string>(),
  searchMoviesSuccess: createStandardAction('movies/SEARCH_SUCCESS')<
    IMovie[]
  >(),
  searchChange: createStandardAction('movies/SEARCH_CHANGE')<string>(),
}

export type MovieAction = ActionType<typeof actions>

export type MovieState = Readonly<{
  movies: IMovie[]
  search: string
}>

export const reducer = combineReducers<MovieState, MovieAction>({
  movies: (state = [], action) => {
    switch (action.type) {
      case getType(actions.searchMovies):
        return state

      case getType(actions.searchMoviesSuccess):
        return action.payload

      default:
        return state
    }
  },
  search: (state = '', action) => {
    switch (action.type) {
      case getType(actions.searchChange):
        return action.payload

      default:
        return state
    }
  },
})

export default actions
