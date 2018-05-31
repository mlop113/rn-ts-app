import * as React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import MovieActions, { IMovie } from '../../Redux/Movie'
import { RootState } from '../../Redux/RootReducer'
import { ApplicationStyles, Colors, Images, Metrics } from '../../Themes'
import ListItem from './ListItem'

interface IProps {
  searchChange: (search: string) => any
  searchMovies: (search: string) => any
  search: string
  movies: IMovie[]
}

class MovieSearch extends React.Component<IProps> {
  public onSearchChange = (search: string) => {
    this.props.searchChange(search)
  }

  public onSearchMovies = () => {
    if (this.props.search) {
      this.props.searchMovies(this.props.search)
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            onChangeText={this.onSearchChange}
            onSubmitEditing={this.onSearchMovies}
            value={this.props.search}
            placeholder="Search Movies"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.onSearchMovies}
          >
            <Text style={styles.searchButtonText}>Go!</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.movies}
          contentContainerStyle={styles.moviesContainer}
        >
          {this.props.movies.map(movie => {
            return <ListItem key={movie.id} movie={movie} />
          })}
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = {
  searchChange: MovieActions.searchChange,
  searchMovies: MovieActions.searchMovies,
}

const mapStateToProps = (state: RootState) => ({
  search: state.movie.search,
  movies: state.movie.movies,
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch)

const styles = StyleSheet.create({
  ...(ApplicationStyles.screen as any),
  container: {
    paddingBottom: 0,
    flex: 1,
  },
  moviesContainer: {
    flexGrow: 1,
    padding: Metrics.baseMargin,
    margin: Metrics.baseMargin,
  },
  movies: {
    marginTop: 0,
  },
  input: {
    backgroundColor: Colors.text,
    color: '#000',
    height: 40,
    flex: 1,
    padding: Metrics.baseMargin,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    margin: Metrics.baseMargin,
    marginTop: Metrics.section,
    marginBottom: 0,
  },
  searchButton: {
    backgroundColor: Colors.bloodOrange,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    ...ApplicationStyles.screen.titleText,
  },
})
