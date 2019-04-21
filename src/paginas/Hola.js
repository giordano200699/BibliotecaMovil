
import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView, Dimensions} from 'react-native';


var dimensiones = Dimensions.get('window');
var altura = dimensiones.height;
var ancho = dimensiones.width;


export default class Hola extends Component {
  render() {
    return (
        //<View style={styles.container}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor='#0A1970' barStyle='light-content'/>
          <Text style={styles.Texto}> Bienvenido Usuario !!!</Text>
        </ScrollView>
        //</View>
    );
  }
}

  
const styles = StyleSheet.create({
  container : {
    backgroundColor: '#456f9f',
    flex: 1
    //flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center'
  },

    Texto : {
      //fontSize: 25,
      fontSize: altura/23.7,
      color: 'rgba(255,255,255,0.7)',
      //marginVertical: 5, 
      marginVertical: altura/118.4, 
    }
  


});