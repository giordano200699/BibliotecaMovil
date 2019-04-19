'use strict'
import React, {Component} from 'react';
import {View, Text, TouchableHighlight,Alert,StyleSheet,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, ThemeProvider,Input } from 'react-native-elements';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';


const BODY_COLOR = '#000022', TEXT_MUTED = '#888888';

const constants = {
  BODY_COLOR, TEXT_MUTED,
};

const classes = {
  title: {
    color: 'red',
  }
};
const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = bootstrapStyleSheet.create();
const c = bootstrapStyleSheet.constants;

const theme = {
  Input: {
    marginTop: 20,
    marginBottom:20,
    raised: false,
  },
  Button:{
  	marginTop:500
  }
};

 class loginVista extends Component {
	render(){
		return(
						
			<ImageBackground source={{uri:"http://www.hdfondos.eu/pictures/2014/1022/1/orig_58032.jpg"}} style={{width: '100%', height: '100%'}}>
					<View style={styles2.container}>
						
						<Text h1 style={styles2.titulo}>Login</Text>
						<ThemeProvider theme={theme}>
					    <Input placeholder='Código' shake={true} />
					    <Input placeholder='Contraseña' shake={true} />
					    <Button  title="Loguearte" onPress={(this.loguearte.bind(this))} />
					    </ThemeProvider>
						
					</View>
					</ImageBackground>
						

			)
	};
	
	loguearte(){
		Alert.alert(
		'Acceso',
		'Te has logueado en el sistema',
		[
			{
				text: 'Aceptar',
				onPress: (this.aceptar.bind(this))
			},
			{
				text:  'Cancelar',
				onPress: (this.cancelar.bind(this))
			}
		])
	};
	aceptar(){

	};
	cancelar(){

	};
}


const styles2 = StyleSheet.create({
	container: {
    	flex: 1,
    	alignItems: 'stretch',
    	//textAlign: 'center',
    	//padding:30
  	},
	boton:{
		width:250,
		height: 50,
		backgroundColor:'red',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
		marginBottom: 10,
		borderRadius: 8,
		borderWidth: 1
	},
	textoBoton:{
		color: 'white'
	},
	titulo:{
		marginTop: 50,
		marginBottom:50,
		fontSize:50,
		color: 'white',
		//textAlign: 'center'
	},
	empujar:{
		marginTop: 10
	},
	Button: {
       			marginTop: 10
  	}
});

module.exports = loginVista;