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
    
    try {
      const name = await AsyncStorage.getItem('username')
      console.log(name);
      console.log(global.logged);

      if (name !== null && name !='undefined') {
        logged = true;
        global.uname = name;
      }
      
    } catch (e) {
      console.log('Failed to load .')
    }
    await Font.loadAsync({
      'Nova': require('./assets/fonts/NovaMono.ttf'),
    });
    this.setState({ assetsLoaded: true });
}


  render() {
   
    if (this.state.assetsLoaded){
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
        initialRouteName: logged ? 'Main' : 'Login',
        headerMode: 'none'
      });
      
      const AppContainer = createAppContainer(AppNavigator);
    return <AppContainer />;
    }
    else{
      return <AppLoading></AppLoading>;
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});