import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

type Props = {};

export default class Form extends Component<Props> {
    render() {
      return (
        <View style={styles.container}>
            <TextInput style={styles.inputBox} 
                placeholder='Código'
                placeholderTextColor='#ffffff' 
            />
            <TextInput style={styles.inputBox} 
                placeholder='Contraseña'
                secureTextEntry={true}
                placeholderTextColor='#ffffff' 
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> Acceder </Text>
            </TouchableOpacity>
        </View> 
      );
    }
  }

  const styles = StyleSheet.create({
    
    container : {
      //flex: 1,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    inputBox: {
        width:300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },

    
    button: {
        width:300,
        backgroundColor:'#001970',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },

    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }

  });