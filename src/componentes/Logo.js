import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

type Props = {};

export default class Logo extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: altura/7.9, height:ancho/4.1}}
        source={require('../images/BiblioFisi.png')}/>
        <Text style={styles.logoTex}> BiblioFisi </Text>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  
  container : {
    flex: 1,
    alignItems: 'center',
    //marginVertical: 50,
    marginTop: altura/7.9,
    marginBottom: altura/24, 
    justifyContent: 'center'
  },

  logoTex : {
    //fontSize: 25,
    fontSize: altura/23.7,
    color: 'rgba(255,255,255,0.7)',
    //marginVertical: 5, 
    marginVertical: altura/118.4, 
  }

});