import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,ScrollView,Dimensions,StatusBar,Image,Alert,TouchableOpacity,Modal
} from 'react-native'



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
      mostrarModal:false,
      libro: null,
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

          

          fetch('http://bibliotecabackend.herokuapp.com/libros/todo/'+entrada.libroId+'?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n')
          .then((response)=>{
              return response.json();
          })
          .then((result2)=>{
            //if(entrada.libroId==2){
              
              let contador=0;
              let autores =[];
              result2.forEach((item, index, array) => {
                    autores.push(
                      <Text style={styles.estiloTexto}>{item.nombre}</Text>
                    );
                    contador++;
                    
                    if (contador === result2.length) {
                      
                      variable.push(
                        <TouchableOpacity style={styles.padreImagen} onPress={()=> {
                          //this.props.navigation.navigate('InfoLibro',{libro:entrada});
                          //this.props.navigation.navigate('DrawerOpen');
                            this.setState({
                              mostrarModal:true,
                              libro:entrada
                            });
                          }
                        }>
                          <Image style={styles.imagenEstilo} source={{uri:this.state.ruta1}} />
                          <View >
                          <Text style={styles.estiloTexto}>{entrada.titulo}</Text>
                          {autores}
                          </View>
                        </TouchableOpacity>
                        );
                      this.setState({
                        codigo:variable,
                      },()=>{
                        if(entrada.libroId== result[result.length-1].libroId){
                          this.setState({
                            cargoData:true
                          });
                        }
                      });
                    }
              });

            //}
              
            
              
          }) 
          

          
        }

        this.setState({
            
            data:result
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
            <Text style={styles.Texto}> Lista de Libros</Text>
        </View>

        <Modal visible={this.state.mostrarModal} 
        >
          <View style={{flexDirection:'row'}}>
            <Text > Lista de Libros</Text>
            <TouchableOpacity style={{marginLeft: 'auto'}} onPress={()=>{
              this.setState({
                mostrarModal:false
              });
            }}>
            <Text style={styles.cerrarModalTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
          {this.state.libro?
            <View style={styles.container}>
              <View>
                <Text style={styles.tituloSeccion}> Lista de Libros</Text>
              </View>
              <View style={styles.containerModal}>
                <Text style={styles.tituloSeccion}>{this.state.libro.titulo}</Text>
                <Text style={styles.textoSeccion} >{this.state.libro.tituloSecundario}</Text>

                <Text >Resumen</Text>
                <Text style={styles.textEsp}>{this.state.libro.resumen}</Text>

                <Text >Información General</Text>
                <Text style={styles.textEsp}>Clasificacion: {this.state.libro.clasificacion}</Text>
                <Text style={styles.textEsp}>Edición: {this.state.libro.edicion}</Text>
                <Text style={styles.textEsp}>Año: {this.state.libro.anio}</Text>
                <Text style={styles.textEsp}>Tomo: {this.state.libro.tomo}</Text>
                <Text style={styles.textEsp}>ISBN: {this.state.libro.isbn}</Text>
                <Text style={styles.textEsp}>Extensión: {this.state.libro.extension}</Text>
                <Text style={styles.textEsp}>Dimensiones: {this.state.libro.dimensiones}</Text>
                <Text style={styles.textEsp}>Observaciones: {this.state.libro.observaciones}</Text>
                <Text style={styles.textEsp}>Acompañamiento: {this.state.libro.acompaniamiento}</Text>
              </View>
            </View>
          :null}

        </Modal>        
            
              {this.state.cargoData?this.state.codigo:null}
            
          
        
        
      </ScrollView>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerModal : {
    //backgroundColor: '#F0F0F0',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  tituloSeccion:{
    fontSize:22,
    marginLeft:12,
    marginBottom:5
  },

  textoSeccion:{
    fontSize: 15,
    marginLeft:16,
    marginBottom:15
  },

  text:{
    fontSize:30
  },

  textEsp:{
    marginBottom:5
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
    flexDirection:'row'
  },

  imagenEstilo:{
    width:80,
    height:80,
    borderRadius: 100,
    marginRight:20
  },
  estiloTexto:{
    width:200
  },

  cerrarModalTexto:{
    //backgroundColor: '#F0F0F0',
    textDecorationLine: "underline",
    color:'blue',
    fontSize:20,
    width:100,
  }

})