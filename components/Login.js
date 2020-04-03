import * as React from 'react';
import {View, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, Alert, Dimensions} from 'react-native';



export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    loading: false
};

static navigationOptions = { headerMode: 'none', gestureEnabled: false };
  render() {
    const entireScreenHeight = Dimensions.get('window').height;
    const rem = entireScreenHeight / 380;
    const entireScreenWidth = Dimensions.get('window').width;
    const wid = entireScreenWidth / 380;
    var ree;
    if (entireScreenWidth>=0.92*entireScreenHeight*4/9*1524/1200){
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
      <View style={styles.container}>
        
        <ImageBackground source={require('../assets/login.png')} style={styles.image}>

          <Image source={require('../assets/vh.png')} style = {styles.imagefront} resizeMode="contain"></Image>
          <Image source={require('../assets/dtime.png')} style = {{
    height: '5%',
    width: '74%',
    flex: 1,
  }}resizeMode="contain"></Image>
  <ImageBackground source={require('../assets/form.png')} style = {{
    alignItems: 'center',
    flex:4,
    width: '100%',

  }}resizeMode="contain">
   <View style = {{
      width: 200*wid,
      flex:1,
      justifyContent: 'flex-end'
    }}>
    <TextInput
        style={{ fontSize: 12*rem, width: 200*wid, marginBottom: 24*ree }}
        textAlign={'center'}
        onChangeText={(value) => this.setState({username: value})}
        value={this.state.username}
    /></View>
    <View style = {{
      width: 200*wid,
      flex:1,
      
    }}>
    <TextInput
        style={{ fontSize: 12*rem, width: 200*wid, marginTop: ree*37}}
        textAlign={'center'}
        onChangeText={(value) => this.setState({password: value})}
        value={this.state.password}
        secureTextEntry={true}
    />
    
 </View>
  </ImageBackground>
  <View style = {{
      width: '73%',
      flex:2,
      justifyContent:'center'
    }}>
    <TouchableOpacity
        style={{    
        height: entireScreenWidth*0.73*276/1096,
        width: '100%',}}
        onPress={onPress}
        disabled={this.state.loading}
        
      >
        <Image source={require('../assets/logbut.png')} style = {{
          height: '100%',
          width: '100%',
          flex:1
          

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