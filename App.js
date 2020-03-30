import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  state = {
    username: '',
    password: ''
};
  render() {
    

    const onPress = () => {
      var uname = this.state.username;
        var pword = this.state.password;
      const Http = new XMLHttpRequest();
        const url='https://script.google.com/macros/s/AKfycbyxLUDyNjCQyPPPzaE7CnWMTBGgetrDwQeKkjfGPNdLieRvmgw/exec';
        var data = "?username="+uname+"&password="+pword+"";
        Http.open("GET", String(url+data));
        Http.send();
        var ok;

        Http.onreadystatechange = (e) => {
            ok = Http.responseText;
        if (Http.readyState == 4)
        {
          if(String(ok) == "true"){
            alert("yay");
            }
            else{
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
  <View
  style = {{
    height: '40%',
    width: '90%'
    
  }}>
  <ImageBackground source={require('./assets/form.png')} style = {{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: '5%'
  }}resizeMode="contain">
    <TextInput
        style={{marginTop: '29%', fontSize: '30%', width: '80%' }}
        textAlign={'center'}
        onChangeText={(value) => this.setState({username: value})}
        value={this.state.username}
    />
    <TextInput
        style={{marginTop: '21.5%', fontSize: '30%', width: '80%'}}
        textAlign={'center'}
        onChangeText={(value) => this.setState({password: value})}
        value={this.state.password}
        secureTextEntry={true}
    />
  </ImageBackground>
</View>

  <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
      >
        <Image source={require('./assets/logbut.png')} style = {{
          height: '150%',
          width: '150%',

  }}resizeMode="contain"></Image>
      </TouchableOpacity>
  
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
    height: '10%',
    width: '50%',
    alignItems: 'center',
  },

});
