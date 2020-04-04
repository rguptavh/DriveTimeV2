// App.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';
import log from './components/Login';
import mainscr from './components/Mainpage';
import logdrive from './components/Logdrive';


export default class App extends React.Component {
  static navigationOptions = { headerShown: 'false', headerMode: 'screen', gestureEnabled: false }; 
  state = {
    assetsLoaded: false,
};

async componentDidMount() {
    await Font.loadAsync({
      'Nova': require('./assets/fonts/NovaMono.ttf'),
    });

    this.setState({ assetsLoaded: true });
}


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
  },
  Logdrive: {
    screen: logdrive
  }
},{
  initialRouteName: "Login",
  headerMode: 'none'
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