import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class App extends React.Component<{}> {
  public render() {
    return (
      <View style={styles.container}>
        <Text>Launch Screen!!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ff0',
    flex: 1,
    justifyContent: 'center',
  },
})
