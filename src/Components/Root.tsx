import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import ReduxPersist from '../Config/ReduxPersist'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/Startup'

// Styles
import styles from './Root.styles'

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
