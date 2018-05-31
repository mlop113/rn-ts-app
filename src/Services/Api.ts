import apisauce from 'apisauce'
import Config from 'react-native-config'

console.tron.log(Config.API_KEY)
const internalApi = apisauce.create({
  baseURL: Config.BASE_URI,
  headers: {
    'Cache-Control': 'no-cache',
  },
  params: {
    api_key: Config.API_KEY,
  },
  timeout: 10000,
})

const searchMovies = (search: string) =>
  internalApi.get('/search/movie', { query: search })

const api = {
  searchMovies,
}

export type API = typeof api

export default api
