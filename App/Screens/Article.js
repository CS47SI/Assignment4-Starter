import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, WebView } from 'react-native';
import { Images, Colors, Metrics } from '../Themes'

export default class Article extends React.Component {

  state = {
    loading: true,
    url : 'https://www.google.com',
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <WebView
          style={styles.webView}
          source={{uri: this.state.url}}/>

      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    height: '90%',
    resizeMode: 'contain',
  },
  webView: {
    flex: 1,
  },
});
