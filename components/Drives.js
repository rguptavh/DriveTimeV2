import React from "react";
import { FlatList, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, View, Fragment, Image, Alert } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";
import Swipeout from 'react-native-swipeout';
import moment from 'moment';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: global.drives,
      stickyHeaderIndices: [],
      isSwiping: false
    };
  }
  deleteNote(item) {
    Alert.alert(
      "Delete Drive",
      "Are you sure you want to delete your drive?",
      [
        {
          text: "No"
        },
        { text: "Yes", onPress: () => {
          var temp = this.state.data;
          for (i = 0; i<temp.length;i++){
            if(temp[i].id == item.id){
              temp.splice(i,1);
              break;
            }
          }
          let result = [];
          const map = new Map();
            for (const item of temp) {
              if (!map.has(item.date) && !item.header) {
                map.set(item.date, true);    // set any value to Map
                result.push(item.date);
              }
            }
            for (i = 0; i<temp.length; i++){
              if (temp[i].header && !result.includes(temp[i].date)){
                temp.splice(i,1);
                break;
              }
            }
            global.drives = temp;
          this.setState({data: temp});

        }
       }
      ],
      { cancelable: false }
    );
  }
  _renderItem = ({ item }) => {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => {this.deleteNote(item) }
    },];

    if (item.header) {

      return (

        <ListItem itemDivider>
          <Body style={{ marginRight: 0, alignItems: 'center' }}>
            <Text style={{ fontWeight: "bold" }}>
              {moment(item.date, 'MM-DD-YYYY').format('MMMM Do, YYYY')}
            </Text>
          </Body>
        </ListItem>



      );
    }
    else {
      return (
        <Swipeout  right={swipeBtns} onOpen={() => this.setState({isSwiping: true})}
        onClose={() => this.setState({isSwiping: false})} style = {{backgroundColor: 'transparent'}}>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'transparent' }}>
          <TouchableOpacity style={{ width: '100%', flex: 1 }} onPress={() => alert(item.time)}>
            <Body>
              <Text style={{ flex: 1, fontFamily: 'WSB', color: 'white' }}>{item.minutes} minutes</Text>
              <Text style={{ flex: 1, fontFamily: 'WSR', color: 'white' }}>{item.description}</Text>
              <Text style={{ flex: 1, fontFamily: 'WSR', color: 'white' }}>{item.tod} - {item.road} - {item.weather} - {item.time}</Text>
            </Body>
          </TouchableOpacity>
        </ListItem>
        </Swipeout >
      );
    }
  };
  static navigationOptions = { headerMode: 'none', gestureEnabled: false };
  render() {
    const onPress = () => {
      this.props.navigation.navigate('Main')
    }
    console.log(this.state.isSwiping)
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
    if (global.drives.length == 0) {
      return (

        <View style={styles.container}>
          <ImageBackground source={require('../assets/login.png')} style={styles.image}>
            <View style={{ flex: 1, width: '90%', alignItems: 'center' }}>
              <Image source={require('../assets/pastdrives.png')} style={{
                height: '100%',
                width: '84%',
                marginTop: '10%',
                flex: 1,
              }} resizeMode="contain"></Image></View>
            <View style={{ width: '100%', flex: 6, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 25 * wid, color: 'white', fontFamily: 'WSB' }}>Please log your first drive!</Text>
            </View>
            <View style={{
              width: '73%',
              flex: 1,
              justifyContent: 'center'
            }}>
              <TouchableOpacity
                style={{
                  height: entireScreenWidth * 0.73 * 276 / 1096,
                  width: '100%',
                }}
                onPress={onPress}
                disabled={this.state.loading}

              >
                <Image source={require('../assets/backbut.png')} style={{
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
    else {
      return (

        <View style={styles.container}>
          <ImageBackground source={require('../assets/login.png')} style={styles.image}>
            <View style={{ flex: 1, width: '90%', alignItems: 'center' }}>
              <Image source={require('../assets/pastdrives.png')} style={{
                height: '100%',
                width: '100%',
                marginTop: '10%',
                flex: 1,
              }} resizeMode="contain"></Image></View>
            <View style={{ width: '100%', flex: 6 }}>
              <FlatList style={{ width: '100%' }}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={item => item.id}
                scrollEnabled={!this.state.isSwiping}
              // stickyHeaderIndices={this.state.stickyHeaderIndices}
              />
            </View>
            <View style={{
              width: '73%',
              flex: 1,
              paddingBottom: '2%',
              paddingTop: '2%',
              justifyContent: 'center',
              alignItems: 'center'

            }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: entireScreenHeight / 8 * 0.96,
                }}
                onPress={onPress}
                disabled={this.state.loading}

              >
                <Image source={require('../assets/backbut.png')} style={{
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

});