
import React, {Component} from 'react';
import {StyleSheet, Text, View,ScrollView} from 'react-native';

import Logo from '../componentes/Logo';
import Form from '../componentes/Form';

type Props = {};


export default class Login extends Component<Props> {
  render() {
    return (
      //<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
          <Logo/>
          <Form/>
      </View>
      //</ScrollView>
    );
  }
}

/*
const styles = StyleSheet.create({
  container : {
    backgroundColor: '#303f9f',
    flex: 1
    //flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center'
  }

});*/

const styles = StyleSheet.create({
container : {
  backgroundColor: '#303f9f',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
},

});