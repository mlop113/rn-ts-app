import React from 'react'
import { BackHandler, Platform } from 'react-native'
import { addNavigationHelpers, NavigationState } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import { IApplicationState } from '../Redux'
import AppNavigation from './AppNavigation'

interface IPropsFromState {
  nav: NavigationState
}

interface IPropsFromRedux {
  dispatch: Dispatch
}

type IProps = IPropsFromState & IPropsFromRedux

class ReduxNavigation extends React.Component<IProps> {
  public componentWillMount() {
    if (Platform.OS === 'ios') {
      return
    }
    BackHandler.addEventListener('hardwareBackPress', this.backHandler)
  }

  public componentWillUnmount() {
    if (Platform.OS === 'ios') {
      return
    }
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
  }

  public backHandler = () => {
    const { dispatch, nav } = this.props
    // change to whatever is your first screen, otherwise unpredictable results may occur
    if (nav.routes.length === 1 && nav.routes[0].routeName === 'LaunchScreen') {
      return false
    }
    // if (shouldCloseApp(nav)) return false
    dispatch({ type: 'Navigation/BACK' })
    return true
  }

  public render() {
    return (
      <AppNavigation
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener: createReduxBoundAddListener('root'),
        })}
      />
    )
  }
}

const mapStateToProps = (state: IApplicationState): IPropsFromState => ({
  nav: state.nav,
})
export default connect(mapStateToProps)(ReduxNavigation)
