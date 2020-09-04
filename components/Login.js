import * as React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, Image, ImageBackground, TouchableOpacity, Alert, Dimensions, AsyncStorage, Text, KeyboardAvoidingView } from 'react-native';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';

import * as Google from "expo-google-app-auth";
const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;


export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    loading: false
  };
  signInWithGoogle = async () => {

    const result = await Google.logInAsync({
      iosClientId: "400546646665-8en50d9jelhlcijqkkes4euo0ekhhguh.apps.googleusercontent.com",
      androidClientId: "400546646665-5cm0tfjdfuejb8r0gncvlr0kg8pfn2m3.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      //  console.log("LoginScreen.js.js 21 | ", result.user.givenName);
      //after Google login redirect to Profile
      uname = result.user.givenName + " " + result.user.familyName;
      if (result.user.email.includes("@vhhscougars.org") || (result.user.email).includes("@d128.org") || (result.user.email).includes("@lhswildcats.org")) {
        global.uname = uname;
        this.setState({ loading: true });
        const Http = new XMLHttpRequest();
        const url = 'https://script.google.com/macros/s/AKfycbz21dke8ZWXExmF9VTkN0_3ITaceg-3Yg-i17lO31wtCC_0n00/exec';
        var data = "?username=" + global.uname + "&action=google";
        Http.open("GET", String(url + data));
        Http.send();
        var ok;
        Http.onreadystatechange = (e) => {
          ok = Http.responseText;
          if (Http.readyState == 4) {
            // console.log(String(ok));
            var response = String(ok).split(",");
            if (response[0] == "false") {

              //global.uname = this.state.username;
              AsyncStorage.setItem('username', global.uname);
              var data = [];
              global.comments = response[1];
              global.totalhrs = Math.floor(parseFloat(response[2]));
              global.totalmins = Math.round((parseFloat(response[2]) - global.totalhrs) * 60);
              global.day = response[3];
              global.nighthrs = Math.floor(parseFloat(response[4]));
              global.nightmins = Math.round((parseFloat(response[4]) - global.nighthrs) * 60);
              global.local = parseFloat(response[5]);
              global.highway = parseFloat(response[6]);
              global.tollway = parseFloat(response[7]);
              global.urban = parseFloat(response[8]);
              global.rural = parseFloat(response[9]);
              global.plot = parseFloat(response[10]);
              global.sunny = parseFloat(response[11]);
              global.rain = parseFloat(response[12]);
              global.snow = parseFloat(response[13]);
              global.fog = parseFloat(response[14]);
              global.hail = parseFloat(response[15]);
              global.sleet = parseFloat(response[16]);
              global.frain = parseFloat(response[17]);
              response.splice(1, 17);
              // console.log(response.toString());

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
                )
              }
              // console.log(JSON.stringify(data))
              data = data.sort((a, b) => moment(b.date + " " + b.time, 'MM-DD-YYYY h:mm A').format('X') - moment(a.date + " " + a.time, 'MM-DD-YYYY h:mm A').format('X'))
              const map = new Map();
              let result = [];
              for (const item of data) {
                if (!map.has(item.date)) {
                  map.set(item.date, true);    // set any value to Map
                  result.push(item.date);
                }
              }
              const length = data.length;
              const length2 = result.length;
              for (i = 0; i < data.length; i++) {
                if (result.includes(data[i].date)) {
                  result.shift();
                  // console.log(result)
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
              data.unshift({
                description: "EXPORT",
                tod: "EXPORT",
                date: "EXPORT",
                time: "EXPORT",
                minutes: "EXPORT",
                road: "EXPORT",
                weather: "EXPORT",
                id: "" + (data.length + 1),
                header: true
              });
              global.drives = data;
              // console.log(JSON.stringify(data))
              this.setState({ loading: false });
              this.props.navigation.replace('Main')

            }
            else {
              this.setState({ loading: false });
              setTimeout(() => { alert(response); }, 100);
            }

          }
        }
        // this.props.navigation.replace("Main", {username:result.user.givenName});

      }
      else {
        setTimeout(() => { alert("Please use a school issued account"); }, 100);

      }
      return result.accessToken;
    } else {
      return { cancelled: true };
    }

  };
  regLogin = () => {
    var uname = this.state.username;
    var pword = this.state.password;
    this.setState({ loading: true });
    const Http = new XMLHttpRequest();
    const url = 'https://script.google.com/macros/s/AKfycbz21dke8ZWXExmF9VTkN0_3ITaceg-3Yg-i17lO31wtCC_0n00/exec';
    var data = "?username=" + uname + "&password=" + pword + "&action=login";
    Http.open("GET", String(url + data));
    Http.send();
    var ok;
    Http.onreadystatechange = (e) => {
      ok = Http.responseText;
      if (Http.readyState == 4) {
        console.log(String(ok));
        var response = String(ok).split(",");
        // console.log(response.join(","))
        if (response[0] == "true") {

          global.uname = this.state.username;
          AsyncStorage.setItem('username', this.state.username);
          var data = [];
          global.comments = response[1];
          global.totalhrs = Math.floor(parseFloat(response[2]));
          global.totalmins = Math.round((parseFloat(response[2]) - global.totalhrs) * 60);
          global.day = response[3];
          global.nighthrs = Math.floor(parseFloat(response[4]));
          global.nightmins = Math.round((parseFloat(response[4]) - global.nighthrs) * 60);
          global.local = parseFloat(response[5]);
          global.highway = parseFloat(response[6]);
          global.tollway = parseFloat(response[7]);
          global.urban = parseFloat(response[8]);
          global.rural = parseFloat(response[9]);
          global.plot = parseFloat(response[10]);
          global.sunny = parseFloat(response[11]);
          global.rain = parseFloat(response[12]);
          global.snow = parseFloat(response[13]);
          global.fog = parseFloat(response[14]);
          global.hail = parseFloat(response[15]);
          global.sleet = parseFloat(response[16]);
          global.frain = parseFloat(response[17]);
          response.splice(1, 17);
          // console.log(response.toString());

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
            )
          }
          // console.log(JSON.stringify(data))
          data = data.sort((a, b) => moment(b.date + " " + b.time, 'MM-DD-YYYY h:mm A').format('X') - moment(a.date + " " + a.time, 'MM-DD-YYYY h:mm A').format('X'))
          const map = new Map();
          let result = [];
          for (const item of data) {
            if (!map.has(item.date)) {
              map.set(item.date, true);    // set any value to Map
              result.push(item.date);
            }
          }
          const length = data.length;
          const length2 = result.length;
          for (i = 0; i < data.length; i++) {
            if (result.includes(data[i].date)) {
              result.shift();
              // console.log(result)
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
          data.unshift({
            description: "EXPORT",
            tod: "EXPORT",
            date: "EXPORT",
            time: "EXPORT",
            minutes: "EXPORT",
            road: "EXPORT",
            weather: "EXPORT",
            id: "" + (data.length + 1),
            header: true
          });
          global.drives = data;
          // console.log(JSON.stringify(data))
          this.setState({ loading: false });
          this.props.navigation.replace('Main')

        }
        else if (response[0] == "false") {
          this.setState({ loading: false });
          setTimeout(() => { alert("Failed login"); }, 100);

        }
        else {
          this.setState({ loading: false });
          setTimeout(() => { alert("Server Error"); }, 100);
        }

      }
    }
  };
  static navigationOptions = { headerMode: 'none', gestureEnabled: false };
  render() {

    var ree;
    if (entireScreenWidth >= 0.92 * entireScreenHeight * 4 / 9 * 1524 / 1200) {
      ree = rem;
    }
    else {
      ree = 1.75 * wid;
    }
    const onPress = () => {
      this.signInWithGoogle();

    }
    const onPress2 = () => {
      this.regLogin();

    }


    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>

          <View style={styles.container}>
            <Spinner
              visible={this.state.loading}
              textContent={'Logging in...'}
              textStyle={styles.spinnerTextStyle}
            />
            <LinearGradient
              // Background Linear Gradient
              colors={['#64ABFF', '#ADAFB0']}
              style={{
                flex:1,
                width:'100%',
                alignItems:'center'
              }}
            >

              <Image source={require('../assets/vh.png')} style={styles.imagefront} resizeMode="contain"></Image>
              <View style={{ flex: 1, widht: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                  fontWeight: 'bold',
                  color: '#385B8F',
                  fontSize: Math.min(55 * wid, 30 * rem),
                  justifyContent: 'center',
                  fontFamily: 'WSB',
                }}> DriveTime</Text>
              </View>
              <View style={{
                alignItems: 'center',
                flex: 2.5,
                width: '90%',
                backgroundColor: "#ADDDFF",
                borderRadius: 20,
                justifyContent: 'center',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
              }}>
                <View style={{ width: '100%', height: '85%', alignItems: 'center' }}>
                  <View style={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'WSB', color: '#5A6980', fontSize: rem * 15 }}>Username</Text>
                  </View>
                  <View style={{
                    width: '90%',
                    flex: 1.5,
                    borderColor: '#6A99E0',
                    borderWidth: 2,
                    borderRadius: 15
                  }}>
                    <TextInput
                      style={{ fontSize: 15 * rem, width: '100%', height: '100%' }}
                      textAlign={'center'}
                      autoCapitalize='none'
                      autoCompleteType='off'
                      onChangeText={(value) => this.setState({ username: value })}
                      value={this.state.username}

                    /></View>
                  <View style={{ width: '100%', flex: 0.4 }}></View>
                  <View style={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'WSB', color: '#5A6980', fontSize: rem * 15 }}>Password</Text>
                  </View>
                  <View style={{
                    width: '90%',
                    flex: 1.5,
                    borderColor: '#6A99E0',
                    borderWidth: 2,
                    borderRadius: 15
                  }}>
                    <TextInput
                      style={{ fontSize: 15 * rem, width: '100%', height: '100%' }}
                      textAlign={'center'}
                      autoCapitalize='none'
                      autoCompleteType='off'
                      onChangeText={(value) => this.setState({ password: value })}
                      value={this.state.password}
                      secureTextEntry={true}

                    /></View>
                </View>
              </View>
              <View style={{
                width: '90%',
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TouchableOpacity
                  style={{
                    height: '35%',
                    width: '80%',
                    borderRadius: 25,
                    backgroundColor: '#385B8F',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={onPress2}
                  disabled={this.state.loading}

                >
                  <Text style={{ color: 'white', fontFamily: 'WSB', fontSize: Math.min(25 * rem, 45 * wid) }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <Text style={styles.link}>Sign in with Google</Text>
                </TouchableOpacity>
              </View>

            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADAFB0'


  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  imagefront: {
    marginTop: '8%',
    height: '25%',
    width: '80%',
    flex: 2,

  },
  spinnerTextStyle: {
    color: '#FFF',
    top: 60
  },
  link: {
    fontWeight: 'bold',
    color: '#385B8F',
    fontSize: 25 * wid,
    fontFamily: 'WSB',
    marginTop: '5%'
  },
});
