import { StackNavigator } from 'react-navigation'
import MovieDetailsScreen from '../Components/MovieDetails/'
import MovieSearchScreen from '../Components/MovieSearch/'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    MovieSearchScreen: { screen: MovieSearchScreen },
    MovieDetailsScreen: { screen: MovieDetailsScreen },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'MovieSearchScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  }
)

export default PrimaryNav
