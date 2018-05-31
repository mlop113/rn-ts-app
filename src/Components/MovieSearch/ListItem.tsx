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
import Config from 'react-native-config'
import { connect } from 'react-redux'
import MovieActions, { IMovie } from '../../Redux/Movie'
import { RootState } from '../../Redux/RootReducer'
import { ApplicationStyles, Colors, Images, Metrics } from '../../Themes'

interface IProps {
  movie: IMovie
}

export default class ListItem extends React.Component<IProps> {
  public render() {
    const { movie } = this.props
    return (
      <TouchableOpacity style={styles.outer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: movie.posterPath }}
        />
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.titleText}>
            {movie.title}
          </Text>
          <Text numberOfLines={5} style={styles.overview}>
            {movie.overview}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.date}>({movie.releaseDate})</Text>
            <View style={styles.rating}>
              <Text style={styles.popularity}>
                {Math.round(movie.voteAverage * 10)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  ...(ApplicationStyles.screen as any),
  outer: {
    flexDirection: 'row',
    height: 150,
    marginBottom: Metrics.baseMargin,
    backgroundColor: 'rgba(255,255,255, 0.1)',
  },
  image: {
    width: 100,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    opacity: 0.8,
    fontSize: 13,
    color: Colors.text,
    flex: 1,
  },
  rating: {
    width: 25,
    height: 25,
    backgroundColor: Colors.text,
    borderRadius: 12.5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  popularity: {
    fontSize: 13,
    color: Colors.background,
  },
  overview: {
    ...ApplicationStyles.screen.subtitle,
    fontSize: 12,
    color: Colors.text,
    flex: 1,
    paddingRight: 0,
  },
  info: {
    flex: 1,
    margin: Metrics.baseMargin,
  },
})
