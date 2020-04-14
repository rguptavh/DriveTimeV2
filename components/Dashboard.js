import * as React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, Image, ImageBackground, TouchableOpacity, Alert, Dimensions, AsyncStorage, Text, ScrollView } from 'react-native';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-datepicker'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ScalableText from 'react-native-text';



const hours = 15;
const minutes = 7;
const comments = 'Drive More';

export default class Login extends React.Component {
  state = {
    license: '',
    progress1: 0,
    progress2: 0,
    date: '',
    hoursneeded: '-',
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ progress1: (hours * 60 + minutes) / 2400 });
      this.setState({ progress2: (hours * 60 + minutes) / 600 });
    }, 500);

  }
  static navigationOptions = { headerMode: 'none', gestureEnabled: false };
  render() {
    const entireScreenHeight = Dimensions.get('window').height;
    const rem = entireScreenHeight / 380;
    const entireScreenWidth = Dimensions.get('window').width;
    const wid = entireScreenWidth / 380;
    var ree;
    if (entireScreenWidth >= 0.92 * entireScreenHeight * 4 / 9 * 1524 / 1200) {
      ree = rem;
    }
    else {
      ree = 1.75 * wid;
    }

    return (

      <View style={styles.container}>

        <ImageBackground source={require('../assets/login.png')} style={styles.image}>
          <View style={{ flex: 1, width: '100%', marginTop: '12%', }}>
            <View style={{ flex: 16, width: '100%', alignItems: 'center' }}>
              <View style={styles.topcard}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', maxWidth: '90%' }}>
                  <ScalableText style={{ marginTop: '10%' }}>
                    <ScalableText style={{ fontSize: 55, fontFamily: 'WSR', color: 'white' }}>{hours}</ScalableText>
                    <ScalableText style={{ fontSize: 30, fontFamily: 'WSR', color: 'white' }}>hours</ScalableText>
                    <ScalableText style={{ fontSize: 55, fontFamily: 'WSR', color: 'white' }}> {minutes}</ScalableText>
                    <ScalableText style={{ fontSize: 30, fontFamily: 'WSR', color: 'white' }}>minutes</ScalableText>
                  </ScalableText>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <Progress.Bar progress={this.state.progress1} width={entireScreenWidth * 0.8} animated={true} height={rem * 20} borderRadius={25} color='#BBE2FF' borderColor='#D0D0D0' unfilledColor='white' />
                </View>
              </View>
            </View>
            <View style={{ flex: 12, width: '100%', alignItems: 'center' }}>
              <View style={styles.midcard}>
                <View style={{ height: '100%', flex: 2 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <ScalableText style={{ marginTop: '5%' }}>
                      <ScalableText style={{ fontSize: wid * 40, fontFamily: 'WSR', color: 'white' }}>{hours}</ScalableText>
                      <ScalableText style={{ fontSize: wid * 20, fontFamily: 'WSR', color: 'white' }}>hours</ScalableText>
                      <ScalableText style={{ fontSize: wid * 40, fontFamily: 'WSR', color: 'white' }}> {minutes}</ScalableText>
                      <ScalableText style={{ fontSize: wid * 20, fontFamily: 'WSR', color: 'white' }}>minutes</ScalableText>
                    </ScalableText>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Progress.Bar progress={this.state.progress2} width={entireScreenWidth * 0.5} animated={true} height={rem * 15} borderRadius={25} color='#BBE2FF' borderColor='#D0D0D0' unfilledColor='white' />
                  </View>
                </View>
                <View style={{ height: '90%', flex: 1 }}>
                  <Image source={require('../assets/night.png')} style={{
                    height: '100%',
                    width: '90%',
                    flex: 1,
                  }} resizeMode="contain"></Image>
                </View>
              </View>
            </View>
            <View style={{ flex: 12, width: '100%', alignItems: 'center' }}>
              <View style={styles.midcard2}>
                <View style={{ height: '100%', flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <ScalableText style={{ marginTop: '5%' }}>
                      <ScalableText style={{ fontSize: wid * 22, fontFamily: 'WSR', color: 'white' }}>License Date:</ScalableText>
                    </ScalableText>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                    <View style={{ width: '80%', height: '80%', borderRadius: 10, backgroundColor: '#D0D0D0', borderColor: 'white', borderWidth: 2, marginBottom: '20%', alignItems: 'center', justifyContent: 'center' }}>
                      <DatePicker
                        style={{ width: 120 * wid, marginBottom: 10 * ree, }}
                        date={this.state.date}
                        mode="date"
                        minDate={moment().add(1, 'days').format("MM-DD-YYYY")}
                        format="MM-DD-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        placeholder=' '

                        customStyles={{

                          dateInput: { borderWidth: 0 },
                          dateText: {
                            fontSize: 20 * wid,
                            color: 'white',
                            fontFamily: 'WSR'
                          }
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                          this.setState({ date: date });
                          var a = moment();
                          var b = moment(date, 'MM-DD-YYYY')
                          const mins = hours * 60 + minutes;
                          if (mins > 3000) {
                            this.setState({ hoursneeded: 'Done!' })
                          }
                          else {
                            const hrs = b.diff(a, 'days') + 1
                            if (hrs < 7) {
                              var needed = (3000 - mins) / 60;
                              needed = Math.round((needed + Number.EPSILON) * 100) / 100
                              this.setState({ hoursneeded: String(needed) })
                            }

                            else {
                              console.log(hrs)
                              const weeks = Math.round(hrs / 7)
                              var needed = (2400 - mins) / weeks / 60;
                              needed = Math.round((needed + Number.EPSILON) * 100) / 100
                              this.setState({ hoursneeded: String(needed) })
                            }
                          }
                        }
                        }

                      />
                    </View>
                  </View>
                </View>
                <View style={{ height: '90%', flex: 0.05, alignItems: 'center', justifyContent: 'center' }}>
                  <Progress.Bar progress={0} width={entireScreenWidth * 0.9 * 0.1 / 2.1 * 0.5} animated={true} height={rem * 46} borderRadius={25} color='#BBE2FF' borderColor='#D0D0D0' unfilledColor='white' />
                </View>
                <View style={{ height: '90%', flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <ScalableText style={{ marginTop: '14%' }}>
                      <ScalableText style={{ fontSize: wid * 18, fontFamily: 'WSR', color: 'white' }}>Hours Per Week:</ScalableText>
                    </ScalableText>
                  </View>
                  <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <ScalableText style={{ marginTop: '0%' }}>
                      <ScalableText style={{ fontSize: wid * 50, fontFamily: 'WSR', color: 'white' }}>{this.state.hoursneeded}</ScalableText>
                    </ScalableText>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 15, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <View style={styles.topcard}>
                <View style={{ flex: 1, alignItems: 'center', maxWidth: '90%' }}>
                  <ScalableText style={{ fontSize: wid * 25, fontFamily: 'WSB', color: 'white', flex: 1, marginTop: '5%' }}>Teacher Comments: </ScalableText>
                  <View style={{ flex: 4 }}>
                    <ScrollView style={{ width: '100%', flex: 4 }} bounces={false}>
                      <ScalableText style={{ fontSize: wid * 25, fontFamily: 'WSR', color: 'white' }}>{comments}</ScalableText>
                    </ScrollView>
                  </View>
                </View>

              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0, top: 0, position: 'absolute'

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
  topcard: {
    height: '90%', width: '90%', backgroundColor: '#D0D0D0', borderRadius: 25, shadowColor: "#000",
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },

  midcard: {
    height: '90%', width: '90%', backgroundColor: '#D0D0D0', borderRadius: 25, shadowColor: "#000",
    flexDirection: 'row', alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  midcard2: {
    height: '90%', width: '90%', backgroundColor: '#D0D0D0', borderRadius: 25, shadowColor: "#000",
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  }

});
