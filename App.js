import React from 'react';
import Main from './App/Screens/Main'
import Onboarding from './App/Screens/OnboardingScreen'
import { AsyncStorage, StyleSheet, View, SafeAreaView } from 'react-native';
export default class App extends React.Component {

  state = {
    hasDoneOnboarding: false
  }

  _onDone = () => {
    this.setState({hasDoneOnboarding: true});
  }

  render() {
    if(this.state.hasDoneOnboarding) {
      return (
        <SafeAreaView style={styles.container}>
          <Main />
        </SafeAreaView>
      );
    } else {
      return <Onboarding onDone={this._onDone} />;
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
