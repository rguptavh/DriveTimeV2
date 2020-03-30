import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, Alert, Dimensions} from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  state = {
    username: '',
    password: ''
};
  render() {
    const entireScreenHeight = Dimensions.get('window').height;
    const rem = entireScreenHeight / 380;
    const entireScreenWidth = Dimensions.get('window').width;
    const wid = entireScreenWidth / 380;
    const onPress = () => {
      var uname = this.state.username;
        var pword = this.state.password;
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
            alert("yay");
            }
            else{
              alert("failed login");
              console.log(ok);
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
    width: '95%',
    marginTop: '5%'
    
  }}>
  <ImageBackground source={require('./assets/form.png')} style = {{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    
  }}resizeMode="contain">
    <TextInput
        style={{marginTop: 37*rem, fontSize: 15*rem, width: 200*wid}}
        textAlign={'center'}
        onChangeText={(value) => this.setState({username: value})}
        value={this.state.username}
    />
    <TextInput
        style={{marginTop: 36*rem, fontSize: 15*rem, width: 200*wid}}
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
          height: '250%',
          width: '250%',

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
    marginTop: '10%'
  },

});
