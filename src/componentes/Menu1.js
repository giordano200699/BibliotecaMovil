import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,ScrollView,Dimensions,StatusBar,Image,Alert
} from 'react-native'

//import BotonMenu from "../componentes/BotonMenu";

var dimensiones = Dimensions.get('window');
var altura = dimensiones.height;
var ancho = dimensiones.width;

export default class Menu1 extends Component {

  constructor(props){//constructor inicial
    super(props);
    this.state = {
      data:[],
      cargoData:false,
      codigo:null,
      ruta1:"https://bibliotecabackend.herokuapp.com/archivos/imagen/"+this.props.navigation.state.params.usuario.imagenId+"/1?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n" 
    };
    this.miFuncion = this.miFuncion.bind(this);
    this.miFuncion();
}

  async miFuncion(){
    

    await fetch('http://bibliotecabackend.herokuapp.com/libros?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n')//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
    .then((response)=>{
        return response.json();
    })
    .then(async (result)=>{
        var variable = [];
        for (let entrada of result) {

          var autores;

          await fetch('http://bibliotecabackend.herokuapp.com/libros/autores/'+entrada.libroId+'?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n')//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
          .then((response)=>{
              return response.json();
          })
          .then((result2)=>{
              autores = [];
              alert(entrada.libroId);
              for (let entrada2 of result2){
                
                autores.push(
                  <Text style={styles.estiloTexto}>{entrada2.tipo}</Text>
                );
              }
              
          }) 

          variable.push(
            <View style={styles.padreImagen}>
              <Image style={styles.imagenEstilo} source={{uri:this.state.ruta1}} />
              <Text style={styles.estiloTexto}>Lista de Libros{entrada.titulo}</Text>
              {autores}
            </View>
            );
        }

        this.setState({
            cargoData : true,
            data:result,
            codigo:variable
        });
    }) 

  }

  render() {
    const { usuario } = this.props.navigation.state.params;
    const rutaImagen = "https://bibliotecabackend.herokuapp.com/archivos/imagen/"+usuario.imagenId+"/1?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n";
     
    
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor='#0A1970' barStyle='light-content'/>
        <View style={styles.menu}>
            <Text style={styles.Texto}> Lista de Libros {this.state.data.length}</Text>
        </View>
        
            
              {this.state.codigo}
            
          
        
        
      </ScrollView>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize:30
  },
  Texto : {
    fontSize: altura/23.7,
    color: 'rgba(255,255,255,1)',
    marginVertical: altura/118.4, 
    marginLeft:10
  },
  menu:{
    backgroundColor: '#303f9f',
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
    paddingLeft:12
  },
  padreImagen:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingLeft:15,
    paddingBottom: 20,
    flexDirection:'row', flexWrap:'wrap'
  },

  imagenEstilo:{
    width:80,
    height:80,
    borderRadius: 100,
    marginRight:20
  },
  estiloTexto:{
    width:200
  }
})