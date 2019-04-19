/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';

/*
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

*/

import Login from './src/paginas/Login';


type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
        //<View style={styles.container}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor='#001970' barStyle='light-content'/>
          <Login/>
        </ScrollView>
        //</View>
    );
  }
}

/*
const styles = StyleSheet.create({
  container : {
    backgroundColor: '#303f9f',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

});*/

  
const styles = StyleSheet.create({
  container : {
    backgroundColor: '#303f9f',
    flex: 1
    //flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center'
  }

});