// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer } from 'react-navigation';


import log from './components/Login';
import mainscr from './components/Mainpage';


export default class App extends React.Component {
  static navigationOptions = { header: null, headerMode: 'screen' }; 
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: log
  },
  Main: {
    screen: mainscr
  }
},{
  initialRouteName: "Login"
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});