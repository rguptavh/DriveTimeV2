//This is an example code to understand Image//
import React, { Component } from 'react';
//import react in our code.
import { Text, Image, View, StyleSheet } from 'react-native';
//import all the components we are going to use.
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 66, height: 58 }}
          source={{
            uri:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
          }}
        />
        {/* If you want to show image from local directory
        <Image 
          source={require('./your-img.png')}  
          style={{width: 400, height: 400}} 
        />*/}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
          }}
          style={{ width: 400, height: 400, margin: 16 }}
        />
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
});
