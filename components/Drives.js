import React from "react";
import { FlatList, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, View, Fragment, Image} from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: global.drives,
      stickyHeaderIndices: []
    };
  }
 
  _renderItem = ({ item }) => {
    if (item.header) {
  
      return (
        
        <ListItem itemDivider>
        <Body style={{ marginRight: 0, alignItems: 'center' }}>
          <Text style={{ fontWeight: "bold" }}>
            {item.date}
          </Text>
        </Body>
      </ListItem>
  

        
      );
    } 
    else {
      return (
        <ListItem style={{ marginLeft: 0 }} onPress={()=>
        alert(item.time)
        }>
          <Body>
            <Text style = {{flex:1, fontFamily: 'WSB', color: 'white'}}>{item.minutes} minutes</Text>
            <Text style = {{flex:1, fontFamily: 'WSR', color: 'white'}}>{item.tod} - {item.road} - {item.weather}</Text>
          </Body>
        </ListItem>
      );
    }
  };
  static navigationOptions = { headerMode: 'none', gestureEnabled: false };
  render() {
    const onPress = () => {
      this.props.navigation.navigate('Main')
  }
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
    if (global.drives.length == 0){
      return (
     
        <View style={styles.container}> 
        <ImageBackground source={require('../assets/login.png')} style={styles.image}>
        <View style = {{flex:1, width: '90%', alignItems: 'center'}}>
            <Image source={require('../assets/pastdrives.png')} style = {{
      height: '100%',
      width: '84%',
      marginTop:'10%',
      flex: 1,
    }}resizeMode="contain"></Image></View>
    <View style = {{width: '100%', flex: 6, justifyContent: 'center', alignItems: 'center'}}>
        <Text style = {{fontSize: 25*wid, color: 'white', fontFamily: 'WSB'}}>Please log your first drive!</Text>
        </View>
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
          <Image source={require('../assets/backbut.png')} style = {{
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
    else{
    return (
     
      <View style={styles.container}> 
      <ImageBackground source={require('../assets/login.png')} style={styles.image}>
      <View style = {{flex:1, width: '90%', alignItems: 'center'}}>
          <Image source={require('../assets/pastdrives.png')} style = {{
    height: '100%',
    width: '84%',
    marginTop:'10%',
    flex: 1,
  }}resizeMode="contain"></Image></View>
  <View style = {{width: '100%', flex: 6}}>
      <FlatList style = {{width: '100%'}}
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => item.id}
       // stickyHeaderIndices={this.state.stickyHeaderIndices}
      />
      </View>
       <View style = {{
      width: '73%',
      flex:1,
      paddingBottom: '2%',
      justifyContent:'center',
      alignItems: 'center'
   
    }}>
    <TouchableOpacity
        style={{    
        flex: 1,
        width: entireScreenHeight /8*0.98,
}}
        onPress={onPress}
        disabled={this.state.loading}
        
      > 
        <Image source={require('../assets/backbut.png')} style = {{
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