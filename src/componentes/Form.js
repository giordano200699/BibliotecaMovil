import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions} from 'react-native';

type Props = {};

var dimensiones = Dimensions.get('window');
var altura = dimensiones.height;
var ancho = dimensiones.width;


export default class Form extends Component<Props> {
  
  /*
  constructor (props) {
    super(props);
    this.state = {
      codigo: '',
      contraseña: ''
  };
  this.handleChange = this.handleChange.bind(this)
}

  handleChange (e) {
    const nombre = e.target.nombre;
    const value = e.target.value;
    this.setState({
      [nombre]: value
    })
  }
  */
 
  render() {
    return (
      <View style={styles.container}>
          <TextInput style={styles.inputBox} 
              placeholder='Código'
              placeholderTextColor='#ffffff'
              //value={this.state.nombre}
              //onChange={this.handleChange}
          />
          <TextInput style={styles.inputBox} 
              placeholder='Contraseña'
              secureTextEntry={true}
              placeholderTextColor='#ffffff'
              //value={this.state.contraseña}
              //onChange={this.handleChange} 
          />
          <TouchableOpacity style={styles.button} >
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
        //width:300,
        width: ancho/1.2,
        backgroundColor: 'rgba(255,255,255,0.3)',
        //borderRadius: 25,
        borderRadius: altura/23.7,
        //paddingHorizontal: 20,
        paddingHorizontal: ancho/18,
        fontSize: 16,
        //fontSize: altura/37,
        color: '#ffffff',
        //marginVertical: 10
        marginVertical: altura/59.2
    },

    
    button: {
        //width:300,
        width: ancho/1.2,
        backgroundColor:'#001970',
        //borderRadius: 25,
        borderRadius: altura/23.7,
        //marginVertical: 10
        marginVertical: altura/59.2,
        //paddingVertical: 13
        paddingVertical: altura/45.5
    },

    buttonText: {
        fontSize: 16,
        //fontSize: altura/37,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }

  });