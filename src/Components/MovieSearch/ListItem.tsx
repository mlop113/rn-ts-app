import * as React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IMovie } from '../../Redux/Movie'
import { ApplicationStyles, Colors, Metrics } from '../../Themes'

interface IProps {
  movie: IMovie
  onPress: (id: number) => any
}

export default class ListItem extends React.Component<IProps> {
  public onPress = () => {
    this.props.onPress(this.props.movie.id)
  }

  public render() {
    const { movie } = this.props
    const year = movie.releaseDate.split('-')[0]
    return (
      <TouchableOpacity style={styles.outer} onPress={this.onPress}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: movie.posterPath }}
        />
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.titleText}>
            {movie.title}
            <Text style={styles.date}> ({year})</Text>
          </Text>
          <Text numberOfLines={6} style={styles.overview}>
            {movie.overview}
          </Text>
          <View style={styles.footer}>
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
    justifyContent: 'flex-end',
  },
  date: {
    opacity: 0.65,
    fontSize: 13,
    color: Colors.text,
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
