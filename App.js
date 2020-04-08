// App.js
import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';
import log from './components/Login';
import mainscr from './components/Mainpage';
import logdrive from './components/Logdrive';
import { AppLoading } from 'expo';

let logged = false;

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
    
    try {
      const name = await AsyncStorage.getItem('username')
      console.log(name);

      if (name !== null) {
        logged = true;
        global.uname = name;
      }
    } catch (e) {
      console.log('Failed to load .')
    }
}


  render() {
    if (this.state.assetsLoaded){
    return <AppContainer />;
    }
    else{
      return <AppLoading></AppLoading>;
    }
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
  initialRouteName: logged ? "Login" : 'Main',
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