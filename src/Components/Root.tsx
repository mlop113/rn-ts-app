import React, { Component } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import ReduxPersist from '../Config/ReduxPersist'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/Startup'
import { Colors } from '../Themes'

interface IProps {
  startup: () => void
}

class RootContainer extends Component<IProps> {
  public componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  public render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapDispatchToProps = {
  startup: StartupActions.startup,
}

export default connect<{}, IProps>(null, mapDispatchToProps)(RootContainer)

const styles = StyleSheet.create({
  applicationView: {
    flex: 1,
  },
})
