import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions,Alert} from 'react-native';

type Props = {};

var dimensiones = Dimensions.get('window');
var altura = dimensiones.height;
var ancho = dimensiones.width;


export default class Form extends Component<Props> {

  /*handleChange (e) {
    const nombre = e.target.nombre;
    const value = e.target.value;
    this.setState({
      [nombre]: value
    })
  }
  */

  constructor(){
    super();
    this.state = {
      codigo: '',
      contrasenia: ''
    }
  }

  cambioCodigo(codigo){
    this.setState({codigo});
  }

  cambioContrasenia(contrasenia){
    this.setState({contrasenia});
  }

  async preAutorizacion(){
    try {
      let response = await fetch(
        'https://bibliotecabackend.herokuapp.com/usuarios',
      );
      let responseJson = await response.json();
      Alert.alert(''+ responseJson.descripcion);
    } catch (error) {
      console.error(error);
    }
    //Alert.alert('Datos Obtenidos! '+this.state.codigo);
  }
 
  render() {
    return (
      <View style={styles.container}>
          <TextInput style={styles.inputBox} 
              placeholder='Código'
              placeholderTextColor='#ffffff'
              value={this.state.codigo}
              onChangeText={(codigo) => this.cambioCodigo(codigo)}
          />
          <TextInput style={styles.inputBox} 
              placeholder='Contraseña'
              secureTextEntry={true}
              placeholderTextColor='#ffffff'
              value={this.state.contrasenia}
              onChangeText={(contrasenia) => this.cambioContrasenia(contrasenia)}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.preAutorizacion()}>
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