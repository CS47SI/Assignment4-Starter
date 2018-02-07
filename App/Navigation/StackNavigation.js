import { StackNavigator } from 'react-navigation'
import React from 'react';
import { Images, Colors, Metrics } from '../Themes'
import { StyleSheet, Image } from 'react-native';
import MainScreen from '../Screens/Main'
import ArticleScreen from '../Screens/Article'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  //Add your screens here
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'MainScreen',
})

export default PrimaryNav
