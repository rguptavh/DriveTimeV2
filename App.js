// App.js
import React from 'react';
import { StyleSheet, AsyncStorage, BackHandler } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';
import log from './components/Login';
import mainscr from './components/Mainpage';
import drives from './components/Drives';
import logdrive from './components/Logdrive';
import dashboard from './components/Dashboard';
import moment from 'moment';

import { AppLoading } from 'expo';

let logged = false;
export default class App extends React.Component {
  static navigationOptions = { headerShown: 'false', headerMode: 'screen', gestureEnabled: false };
  state = {
    assetsLoaded: false,
  };

  async componentDidMount() {
    global.logging = false;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    let name;
    try {
      name = await AsyncStorage.getItem('username')
      console.log(name);
      console.log(global.logged);

      if (name !== null && name != 'undefined') {
        logged = true;
        global.uname = name;
      }

    } catch (e) {
      console.log('Failed to load .')
    }
    await Font.loadAsync({
      'Nova': require('./assets/fonts/NovaMono.ttf'),
      'WSR': require('./assets/fonts/WorkSans-Regular.ttf'),
      'WSB': require('./assets/fonts/WorkSans-SemiBold.ttf'),
    });

    if (logged) {
      global.logging = true;
      this.setState({ assetsLoaded: true });
      var uname = name;
      const Http = new XMLHttpRequest();
      const url = 'https://script.google.com/macros/s/AKfycbz21dke8ZWXExmF9VTkN0_3ITaceg-3Yg-i17lO31wtCC_0n00/exec';
      var data = "?username=" + uname + "&action=getdrives";
      Http.open("GET", String(url + data));
      Http.send();
      var ok;
      Http.onreadystatechange = (e) => {
        ok = Http.responseText;
        if (Http.readyState == 4) {
          console.log(String(ok));
          var response = String(ok).split(",");
          var data = [];
          for (var x = 0; x < (response.length - 1) / 7; x++) {
            data.push({
              description: response[7 * x + 1],
              tod: response[7 * x + 2],
              date: response[7 * x + 3],
              time: response[7 * x + 4],
              minutes: response[7 * x + 5],
              road: response[7 * x + 6],
              weather: response[7 * x + 7],
              id: "" + x,
              header: false
            }
            );
          }
          console.log(JSON.stringify(data))
          data = data.sort((a, b) => moment(b.date + " " + b.time, 'MM-DD-YYYY h:mm A').format('X') - moment(a.date + " " + a.time, 'MM-DD-YYYY h:mm A').format('X'))
          const map = new Map();
          let result = [];
          for (const item of data) {
            if (!map.has(item.date)) {
              map.set(item.date, true);    // set any value to Map
              result.push(item.date);
            }
          }
          console.log(result)
          const length = data.length;
          const length2 = result.length;
          for (i = 0; i < data.length; i++) {
            if (result.includes(data[i].date)) {
              result.shift();
              const he = {
                header: true,
                description: 'HEADER',
                tod: 'HEADER',
                time: 'HEADER',
                minutes: 'HEADER',
                road: 'HEADER',
                weather: 'HEADER',
                id: "" + (length + (length2 - result.length)),
                date: data[i].date
              }
              data.splice(i, 0, he);
            }
          }
          console.log(JSON.stringify(data))
          console.log(ok)
          global.drives = data;
          global.logging = false;
          
        }
      }
    }
    else {
      this.setState({ assetsLoaded: true });
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {

    if (this.state.assetsLoaded) {
      const AppNavigator = createStackNavigator({
        Login: {
          screen: log
        },
        Main: {
          screen: mainscr
        },
        Logdrive: {
          screen: logdrive
        },
        Drives: {
          screen: drives
        },
        Dashboard: {
          screen: dashboard
        }
      },
        {
          initialRouteName: logged ? 'Main' : 'Login',
          headerMode: 'none'
        });

      const AppContainer = createAppContainer(AppNavigator);
      return <AppContainer />;
    }
    else {
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