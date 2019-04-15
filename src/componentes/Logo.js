import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

type Props = {};

export default class Logo extends Component<Props> {
    render() {
      return (
        <View style={styles.container}>
          <Image style={{width: 100, height: 100}} 
          source={require('../imagenes/BiblioFisi.png')}/>
          <Text style={styles.logoTex}> BiblioFisi </Text>
        </View> 
      );
    }
  }

  const styles = StyleSheet.create({
    
    container : {
      flex: 1,
      alignItems: 'center',
      marginVertical: 50, 
      justifyContent: 'center'
    },

    logoTex : {
      fontSize: 25,
      color: 'rgba(255,255,255,0.7)',
      marginVertical: 5, 
    }

  });