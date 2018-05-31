import * as React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { IMovie } from '../../Redux/Movie'
import { RootState } from '../../Redux/RootReducer'
import { ApplicationStyles, Colors, Images, Metrics } from '../../Themes'

interface IProps {
  movie: IMovie
  goBack: () => any
}

class MovieDetails extends React.Component<IProps> {
  public render() {
    const { movie } = this.props
    const year = movie.releaseDate.split('-')[0]
    return (
      <View style={styles.container}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <View style={styles.header}>
          <Image
            source={{ uri: movie.backdropPath }}
            style={styles.backdropImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={this.props.goBack}
            style={{
              marginLeft: Metrics.baseMargin,
            }}
          >
            <Image source={Images.backButton} />
          </TouchableOpacity>
          <Text numberOfLines={2} style={styles.title}>
            {movie.title}
            <Text style={styles.year}> ({year})</Text>
          </Text>
        </View>
        <View style={styles.content} />
      </View>
    )
  }
}

const mapDispatchToProps = {
  goBack: NavigationActions.back,
}

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movies.find(m => m.id === state.movie.selectedId),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)

const styles = StyleSheet.create({
  ...(ApplicationStyles.screen as any),
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  content: {
    marginTop: Metrics.navBarHeight,
    padding: Metrics.baseMargin,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
    paddingTop: Metrics.baseMargin,
  },
  title: {
    flex: 1,
    fontSize: 22,
    color: Colors.text,
    margin: Metrics.baseMargin,
    marginLeft: Metrics.doubleBaseMargin,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  year: {
    opacity: 0.65,
    fontSize: 14,
  },
  backdropImage: {
    opacity: 0.3,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
})
