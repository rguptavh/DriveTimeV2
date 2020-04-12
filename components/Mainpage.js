import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import moment from 'moment';
const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class Mainpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      hours_Counter: '00',
      startDisable: false,
      assetsLoaded: false,
      username: 'aadiraju',
      password: '789'
    }
  }

  componentWillUnmount() {
    deactivateKeepAwake();
    clearInterval(this.state.timer);
  }
  // Clear username for testing
  async componentDidMount() {
    try {
      await AsyncStorage.removeItem('username');
      return true;
    }
    catch (exception) {
      return false;
    }
  }
  

  logDrive = () => {
    this.props.navigation.navigate('Logdrive')

  }
  pastDrives = () => {
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
          console.log(response.join(","))
          if (response[0] == "true") {

            global.uname = this.state.username;
            AsyncStorage.setItem('username', this.state.username);
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
              )
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
            const length = data.length;
            const length2 = result.length;
            for (i = 0; i < data.length; i++) {
              if (result.includes(data[i].date)) {
                result.shift();
                console.log(result)
                const he = {
                  header: true,
                  description: 'HEADER',
                  tod: 'HEADER',
                  time: 'HEADER',
                  minutes: 'HEADER',
                  road: 'HEADER',
                  weather: 'HEADER',
                  id: "" + (length + (length2 - result.length)),
                  date: moment(data[i].date, 'MM-DD-YYYY').format('MMMM Do, YYYY')
                }
                data.splice(i, 0, he);
              }
            }
            global.drives = data;
            console.log(JSON.stringify(data))
            this.props.navigation.navigate('Drives')
          }
          else if (response[0] == "false") {
            alert("Failed login");
          }
          else {

            alert("Server error");
          }
          this.setState({ loading: false });
        }
      }

  }

  dashBoard = () => {
      
      
    
    this.props.navigation.navigate('Dashboard')

      }
  

  onButtonStart = () => {
    if (!(this.state.startDisable)) {
      activateKeepAwake();
      let timer = setInterval(() => {

        var num = (Number(this.state.seconds_Counter) + 1).toString(),
          count = this.state.minutes_Counter,
          coot = this.state.hours_Counter;

        if (Number(this.state.seconds_Counter) == 59) {
          count = (Number(this.state.minutes_Counter) + 1).toString();
          num = '00';
        }
        if (Number(this.state.minutes_Counter) == 59 && Number(this.state.seconds_Counter) == 59) {
          coot = (Number(this.state.hours_Counter) + 1).toString();
          count = '00';
        }

        this.setState({
          minutes_Counter: count.length == 1 ? '0' + count : count,
          seconds_Counter: num.length == 1 ? '0' + num : num,
          hours_Counter: coot.length == 1 ? '0' + coot : coot
        });
      }, 1000);
      this.setState({ timer });

      this.setState({ startDisable: true })
    }

    else {
      deactivateKeepAwake();
      clearInterval(this.state.timer);
      global.minutes = String(parseInt(this.state.hours_Counter) * 60 + parseInt(this.state.minutes_Counter) + Math.round(parseInt(this.state.seconds_Counter) / 30));
      console.log(global.minutes);
      this.props.navigation.navigate('Logdrive')

      this.setState({ startDisable: false })
      this.setState({
        timer: null,
        minutes_Counter: '00',
        seconds_Counter: '00',
        hours_Counter: '00'
      });

    }

  }
  static navigationOptions = { headerMode: 'none', gestureEnabled: false };

  render() {

    const Handbook = () => {
      WebBrowser.openBrowserAsync('https://www.cyberdriveillinois.com/publications/pdf_publications/dsd_a112.pdf');
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/login.png')} style={styles.image}>
          <View style={{
            width: '85%',
            flex: 2,
            justifyContent: 'center',

          }}>

            <TouchableOpacity
              onPress={this.onButtonStart}
              activeOpacity={0.6}
              style={{
                height: entireScreenWidth * 0.85 * 616 / 1416,
                width: '100%', justifyContent: 'center'
              }}
            >
              <ImageBackground source={require('../assets/timer.png')} style={{
                height: '100%',
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center'


              }} resizeMode="contain">
                <Text style={styles.counterText}>{this.state.hours_Counter}:{this.state.minutes_Counter}:{this.state.seconds_Counter}</Text>

              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{
            width: '100%',
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center'
          }} >
            <TouchableOpacity
              style={{
                height: entireScreenWidth / 2 * 0.9,
                flex: 1
              }} onPress={this.logDrive}
            >
              <Image source={require('../assets/logdrive.png')} style={{
                height: '100%',
                width: '100%',
                flex: 1


              }} resizeMode="contain"></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: entireScreenWidth / 2 * 0.9,
                flex: 1
              }} onPress={this.pastDrives}

            >
              <Image source={require('../assets/pdrive.png')} style={{
                height: '100%',
                width: '100%',
                flex: 1


              }} resizeMode="contain"></Image>
            </TouchableOpacity>
          </View>
          <View style={{
            width: '100%',
            flex: 2,
            flexDirection: 'row',
          }}>
            <TouchableOpacity
              style={{
                height: entireScreenWidth / 2 * 0.9,
                flex: 1
              }} onPress={this.dashBoard}
            >
              <Image source={require('../assets/dash.png')} style={{
                height: '100%',
                width: '100%',
                flex: 1


              }} resizeMode="contain"></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: entireScreenWidth / 2 * 0.9,
                flex: 1
              }} onPress={Handbook}
            >
              <Image source={require('../assets/handbook.png')} style={{
                height: '100%',
                width: '100%',
                flex: 1


              }} resizeMode="contain"></Image>
            </TouchableOpacity>
          </View>
        </ImageBackground>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingTop: 8,
    borderRadius: 10,
    height: '60%',
    flex: 2
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  counterText: {
    fontSize: entireScreenWidth * 50 / 380, textAlign: 'center',
    color: 'white',
    fontFamily: 'Nova',
  }
});
