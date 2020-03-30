import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';



// You can import from local file

// or any pure javascript modules available in npm
export default class App extends React.Component {
  
  render() {
    const onPress = () => {
      var uname = "adiraju";
        var pword = "123";
      const Http = new XMLHttpRequest();
        const url='https://script.google.com/macros/s/AKfycbyxLUDyNjCQyPPPzaE7CnWMTBGgetrDwQeKkjfGPNdLieRvmgw/exec';
        var data = "?username="+uname+"&password="+pword+"";
        Http.open("GET", String(url+data));
        Http.send();
        var ok;

        Http.onreadystatechange = (e) => {
            ok = Http.responseText;
            console.log(String(ok));
            console.log(Http.readyState);
        if (Http.readyState == 4)
        {
          if(String(ok) == "true"){
            alert("yay");
            }
            else{
              console.log("falso");
              alert("failed login");
            }
        }
        }
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/login.png')} style={styles.image}>
          <Image source={require('./assets/car1.png')} style = {styles.imagefront} resizeMode="contain"></Image>
          <Image source={require('./assets/dtime.png')} style = {{
    marginTop: '3%',
    height: '5%',
    width: '74%'
  }}resizeMode="contain"></Image>
  
  <Image source={require('./assets/form.png')} style = {{
    marginTop: '7%',
    width: '90%',
    height: '35%'
  }}resizeMode="contain"></Image>

<View
      style={{
        height: '10%',
        width: '5%',
        marginTop: '10%'
      }}
    >
  <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
      >
        <Image source={require('./assets/logbut.png')} style = {{
          height: '180%',
          width: '5000%'

  }}resizeMode="contain"></Image>
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
  imagefront: {
    marginTop: '15%',
    height: '16%',
    width: '80%'
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
