
import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, Image,Alert,TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {Colors} from '../styles'

import Cabezera from '../componentes/Cabezera'


var dimensiones = Dimensions.get('window');
var altura = dimensiones.height;
var ancho = dimensiones.width;


const Contenedor = styled.View`
    flex:1;
    padding:10px 5px;
    justify-content: center;
    background-color:#f4f4f4;
    align-items:center
`
const Titulo = styled.Text`
    font-size:20px;
    text-align:center;

`
const Item = styled.View`
    flex:1;
    border:1px solid #f7f7f7;
    margin:2px 0;
    border-radius:10px;
    background-color:#fff;
    width:95%;
    padding:10px;
`
const ItemModal = styled.View`
    flex:1;
    border:1px solid #f7f7f7;
    margin:2px 0;
    border-radius:10px;
    background-color:#fff;
    width:95%;
`

const ItemImagen = styled.View`
    flex:1;
    border:0px solid #f7f7f7;
    margin:2px 0;
    border-radius:10px;
    background-color:#f4f4f4;
    width:90%;
    padding:10px;
`


export default class Perfil extends Component {

  constructor(){
    super();
    this.state = {
      tipoUsuario: {}
    }
  }

  regresar(){
    this.props.navigation.goBack();
  }

  async llenarTipoUsuario(id){
      try {

        let response = await fetch(
          'https://bibliotecabackend.herokuapp.com/tipoUsuarios/'+id+'?clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n');
        let responseJson = await response.json();
        this.setState({tipoUsuario:responseJson[0]});
      } catch (error) {
        console.error(error);
      }
  };
  
  render() {
    const usuario = this.props.navigation.getParam('usuario');
    const rutaImagen = "https://bibliotecabackend.herokuapp.com/archivos/imagen/"+usuario.imagenId+"/1?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n";
    this.llenarTipoUsuario(usuario.tipoUsuarioId);

    return (
        <View style={{flex:1}}>
          
          <View>
            <Cabezera navigation = {this.props.navigation} title = "Perfil" />
            {/*<View style={styles.menu}>
              {<TouchableOpacity onPress={() => this.regresar()}> 
                <Image style={ styles.imagenBoton } source={require('./../imagenes/flechaIzquierda.png')} /> 
              </TouchableOpacity>}
              <Text style={styles.Texto}> Perfil</Text>
            </View>*/}
          </View>

          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Contenedor /*style={styles.contenedorPadre}*/>
              <ItemImagen style={styles.padreImagen}>
                <Image style={styles.imagenEstilo} source={{uri:rutaImagen}} />
              </ItemImagen>

              <ItemModal style={{flexDirection: 'column'}}>
                <View style={styles.itemH} >
                  <Text style={styles.subTituloModal}>Datos Personales</Text>
                </View>
                <View style={styles.itemB} >
                  <Text style={styles.textoSeccion}>Nombres : {usuario.nombres}</Text>
                  <Text style={styles.textoSeccion}>Apellidos : {usuario.apellidos}</Text>
                  <Text style={styles.textoSeccion}>Edad : {usuario.edad} años</Text>
                  <Text style={styles.textoSeccion}>Sexo : {usuario.sexo?'Femenino':'Masculino'}</Text>
                  <Text style={styles.textoSeccion}>Dirección : {usuario.direccion}</Text>
                  <Text style={styles.textoSeccion}>DNI : {usuario.dni}</Text>
                  <Text style={styles.textoSeccion}>Teléfono : {usuario.telefonoCasa}</Text>
                  <Text style={styles.textoSeccion}>Móvil : {usuario.telefonoMovil}</Text>
                  <Text style={styles.textoSeccion}>Correo Institucional : {usuario.correoInstitucional}</Text>
                  <Text style={styles.textoSeccion}>Correo Personal : {usuario.correoPersonal}</Text>     
                </View>
              </ItemModal>
            
            {/*
              <Item //style={styles.contenedorItem}>
                <Text style={styles.tituloSeccion}>Datos Personales</Text>
                <Text style={styles.textoSeccion}>Nombres : {usuario.nombres}</Text>
                <Text style={styles.textoSeccion}>Apellidos : {usuario.apellidos}</Text>
                <Text style={styles.textoSeccion}>Edad : {usuario.edad} años</Text>
                <Text style={styles.textoSeccion}>Sexo : {usuario.sexo?'Femenino':'Masculino'}</Text>
                <Text style={styles.textoSeccion}>Dirección : {usuario.direccion}</Text>
                <Text style={styles.textoSeccion}>DNI : {usuario.dni}</Text>
                <Text style={styles.textoSeccion}>Teléfono : {usuario.telefonoCasa}</Text>
                <Text style={styles.textoSeccion}>Móvil : {usuario.telefonoMovil}</Text>
                <Text style={styles.textoSeccion}>Correo Institucional : {usuario.correoInstitucional}</Text>
                <Text style={styles.textoSeccion}>Correo Personal : {usuario.correoPersonal}</Text>
              </Item>
            */}
            
            <ItemModal style={{flexDirection: 'column'}}>
              <View style={styles.itemH} >
                <Text style={styles.subTituloModal}>Mis Pedidos</Text>
              </View>
              <View style={styles.itemB} >
                <Text style={styles.textoSeccion}>Préstamos activos : {usuario.pedidosActivos}</Text>
                <Text style={styles.textoSeccion}>Préstamos aceptados : {usuario.pedidosAceptados}</Text>
                <Text style={styles.textoSeccion}>Préstamos rechazados : {usuario.pedidosRechazados}</Text> 
              </View>
            </ItemModal>

            {/*
              <Item //style={styles.contenedorItem}>
                <Text style={styles.tituloSeccion}>Mis Pedidos</Text>
                <Text style={styles.textoSeccion}>Préstamos activos : {usuario.pedidosActivos}</Text>
                <Text style={styles.textoSeccion}>Préstamos aceptados : {usuario.pedidosAceptados}</Text>
                <Text style={styles.textoSeccion}>Préstamos rechazados : {usuario.pedidosRechazados}</Text>
                <Text style={styles.textoSeccion}>Tipo de usuario : {this.state.tipoUsuario.nombre}</Text>
                <Text style={styles.textoSeccion}>Estado : Normal</Text>
                <Text style={styles.textoSeccion}>Número de Préstamos : 78</Text>
                <Text style={styles.textoSeccion}>Número de Castigos: 2</Text>
                <Text style={styles.textoSeccion}>Temas más buscados : Inteligencia Artificial, Economía, Cálculo I, Física III, Cálculo II</Text>
                <Text style={styles.textoSeccion}>Libros más pedidos : Cálculo Integral, Física III, Economía para la Gestión, Inteligencia Articial, Redes Neuronales</Text>
                <Text style={styles.textoSeccion}>Calificación: 111 puntos</Text>
              </Item>
            */}

            </Contenedor>
          </ScrollView>

        </View>
    );
  }
}

  
const styles = StyleSheet.create({
  
  imagenBoton:{
     width:30,
     height:30
  },

  container : {
    backgroundColor: '#F4F4F4',
    flex: 1,
  },

  statusBar : {
    backgroundColor: Colors.primary_dark,
  },

  shadow:{
    elevation: 2
  },

  menu:{
    backgroundColor: Colors.primary,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
    paddingLeft:12
  },

  seccion:{
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 31,
    padding:5
  },

  tituloSeccion:{
    fontSize:22,
    textDecorationLine: "underline",
    marginLeft:12,
    color:'black',
    marginBottom:5
  },

  textoSeccion:{
    fontSize: 14,
    marginLeft:16,
    //color:'black'
    marginBottom:5,
  },

  textEsp:{
    marginBottom:5,
    fontSize:14,
  },

  Texto : {
    fontSize: altura/23.7,
    color: 'rgba(255,255,255,1)',
    marginVertical: altura/118.4, 
    marginLeft:10
  },

  padreImagen:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },

  imagenEstilo:{
    width:150,
    height:150,
    borderRadius: 100
  },

  contenedorPadre: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"#f4f4f4",
    paddingVertical: 20,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contenedorItem: {
    flex: 1,
    backgroundColor:"#fff",
    flexDirection: 'column',
    padding: 10,
    borderWidth: 1,
    borderColor: '#f7f7f7',
    borderRadius: 10
  },

  itemH: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //backgroundColor: Colors.secundary_dark,
    backgroundColor: Colors.primary,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#f7f7f7',
    padding:10,
  },

  itemB: {
    backgroundColor:Colors.secundary_light,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#f7f7f7',
    padding:15,
  },

  subTituloModal:{
    fontSize: 15, //20,
    color: Colors.secundary_light
    //color: Colors.tertiary,
  },

});