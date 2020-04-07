import * as React from 'react';
import {View, StyleSheet,TouchableWithoutFeedback, Keyboard,TextInput, Image, ImageBackground, TouchableOpacity, Alert, Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'; 


export default class Login extends React.Component {
  state = {
    date: '',
    time: '',
    minutes: global.minutes,
    loading: false
};


static navigationOptions = { headerMode: 'none', gestureEnabled: false };
  render() {
    const entireScreenHeight = Dimensions.get('window').height;
    const rem = entireScreenHeight / 380;
    const entireScreenWidth = Dimensions.get('window').width;
    const wid = entireScreenWidth / 380;
    var ree;
    console.log(global.uname);
    if (entireScreenWidth>=entireScreenHeight*3/4*1360/2360 *0.9){
      ree = rem;
    }
    else{
      ree = 1.75*wid;
    }
    const onPress = () => {
      var uname = this.state.username;
        var pword = this.state.password;
        this.setState({loading: true});
      const Http = new XMLHttpRequest();
        const url='https://script.google.com/macros/s/AKfycbz21dke8ZWXExmF9VTkN0_3ITaceg-3Yg-i17lO31wtCC_0n00/exec';
        var data = "?username="+uname+"&password="+pword+"&action=login";
        Http.open("GET", String(url+data));
        Http.send();
        var ok;
        Http.onreadystatechange = (e) => {
            ok = Http.responseText;
        if (Http.readyState == 4)
        {
          if(String(ok) == "true"){
            this.props.navigation.navigate('Main')
            }
            else{
              alert("Failed login");
            }
            this.setState({loading: false});
        }
        }
    }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <View style={styles.container}>
        
        <ImageBackground source={require('../assets/login.png')} style={styles.image}>
<View style = {{flex:1, width: '90%', alignItems: 'center'}}>
          <Image source={require('../assets/drivelog.png')} style = {{
    height: '100%',
    width: '84%',
    marginTop:'10%',
    flex: 1,
  }}resizeMode="contain"></Image></View>
  <ImageBackground source={require('../assets/bigform.png')} style = {{
    alignItems: 'center',
    flex:6,
    width: '100%'
  }}resizeMode="contain">
  <View style = {{flex:1.4, width: '100%'}}></View>
 <View style = {{flex:1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
 <DatePicker
        style={{width: 250*wid, marginTop: 10*ree}}
        date={this.state.date}
        mode="date"
        maxDate = {moment().format("MM-DD-YYYY")}
        format="MM-DD-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon = {false}
        customStyles={{

          dateInput:{borderWidth: 0},
          dateText: {
            fontSize: 12*rem,
        }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>
      <View style = {{flex:1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
     <DatePicker
        style={{width: 250*wid, marginTop: 6*ree}}
        date={this.state.time}
        mode="time"
        format={'h:mm A'}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon = {false}
        showTime={{ use12Hours: true }}
        customStyles={{

          dateInput:{borderWidth: 0},
          dateText: {
            fontSize: 12*rem,
          }
        }}
        onDateChange={(date) => {this.setState({time: date})}}
      /></View>
      <View style = {{flex:1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{ fontSize: 12*rem, width: 200*wid, marginTop: 0*ree, }}
        textAlign={'center'}
        onChangeText={(value) => this.setState({minutes: value})}
        keyboardType= 'number-pad'
        value={this.state.minutes}
        
    />
      </View>
      <View style = {{flex:1, width: '100%'}}></View>
      <View style = {{flex:1, width: '100%'}}></View>

    
  </ImageBackground>
  <View style = {{
      width: '73%',
      flex:1,
      justifyContent:'center'
    }}>
    <TouchableOpacity
        style={{    
        height: entireScreenWidth*0.73*276/1096,
        width: '100%',}}
        onPress={onPress}
        disabled={this.state.loading}
        
      >
        <Image source={require('../assets/savebut.png')} style = {{
          height: '100%',
          width: '100%',
          flex:1
          

  }}resizeMode="contain"></Image>
      </TouchableOpacity>
      </View>
  
      </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
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
    flex:2,

  },

});