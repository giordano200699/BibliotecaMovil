import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,ScrollView,Dimensions,StatusBar,Image,Alert,TouchableOpacity
} from 'react-native'



export default class InfoLibro extends Component {

  constructor(props){//constructor inicial
    super(props);
    this.state = {
      libro : this.props.navigation.getParam('libro')
    };
}

  

  render() {
     
    
    return(
        <View >
            <Text >{this.state.libro.titulo}</Text>
            <Text >{this.state.libro.tituloSecundario}</Text>

            <Text >Resumen</Text>
            <Text >{this.state.libro.resumen}</Text>

            <Text >Información General</Text>
            <Text >Clasificacion: {this.state.libro.clasificacion}</Text>
            <Text >Edición: {this.state.libro.edicion}</Text>
            <Text >Año: {this.state.libro.anio}</Text>
            <Text >Tomo: {this.state.libro.tomo}</Text>
            <Text >ISBN: {this.state.libro.isbn}</Text>
            <Text >Extensión: {this.state.libro.extension}</Text>
            <Text >Dimensiones: {this.state.libro.dimensiones}</Text>
            <Text >Observaciones: {this.state.libro.observaciones}</Text>
            <Text >Acompañamiento: {this.state.libro.acompaniamiento}</Text>
        </View>
      
    )
  }
}

const styles = StyleSheet.create({
  
})