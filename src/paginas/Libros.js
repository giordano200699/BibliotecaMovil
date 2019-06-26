import React, { Component } from 'react'
import { View,Text,TextInput,Button,StyleSheet,ScrollView,Dimensions,StatusBar,Image,Alert,TouchableOpacity,Modal,Picker } from 'react-native'
import styled from 'styled-components'

import Cabezera from '../componentes/Cabezera'
import {Colors} from '../styles'

import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign';



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


export default class Menu1 extends Component {

  constructor(props){//constructor inicial
    super(props);
    this.state = {
      cargoData:false,
      codigo:[],
      mostrarModal:false,
      libro: null,
      ruta1:"https://bibliotecabackend.herokuapp.com/archivos/imagen/"+this.props.navigation.state.params.usuario.imagenId+"/1?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n",
      codigoItemsModal: [],
      itemSeleccionado: null,
      banderaSeleccionItem:false,
      lugarArregloItem:0,
      seleccionPrestamo:0,
      valorBusqueda:'',
      valorBusquedaTrabajado:'',
      paginado:1,
      mostrarMas:false,
      search:''
    };
    this.miFuncion = this.miFuncion.bind(this);
    this.cambiarCodigoItemAnterior = this.cambiarCodigoItemAnterior.bind(this);
    this.pedirLibro = this.pedirLibro.bind(this);
    this.miFuncion(1);
}

updateSearch = search => {
  this.setState({ search });
};

cambiarCodigoItemAnterior(){
  
  if(this.state.itemSeleccionado){

    var codigoItems = this.state.codigoItemsModal;
    var item = this.state.itemSeleccionado;
    codigoItems[this.state.itemSeleccionado.numeroCopia-1] = (
      <View>
        
        {item.disponibilidad>0?
        <TouchableOpacity onPress={()=>{
          this.cambiarCodigoItemAnterior();      
          this.setState({
            itemSeleccionado:item,
            banderaSeleccionItem:true,
            lugarArregloItem: item.numeroCopia-1
          }); 
        }}>
          <Text style={item.disponibilidad==1?styles.itemDisponible:item.disponibilidad==2?styles.itemPedido:item.disponibilidad==3?styles.itemPrestado:styles.itemReservado}>
          Nº{item.numeroCopia}     {item.numeroIngreso+'             '}
          {item.disponibilidad==1?'Disponible':item.disponibilidad==2?'Pedido':item.disponibilidad==3?'Prestado':'Reservado'}
          </Text>
        </TouchableOpacity>
        :null}
      </View>
    );
  }

}

  async miFuncion(paginadoLocal){
    
    await fetch('http://bibliotecabackend.herokuapp.com/libros/paginado/'+paginadoLocal+'?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        busqueda: this.state.valorBusquedaTrabajado
      }),
    })//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
    .then((response)=>{
        return response.json();
    })
    .then(async (result)=>{
        var variable = this.state.codigo;
        var contadorLibros = 1;
        for (let entrada of result) {

          if(contadorLibros != 5){
            contadorLibros++;

            fetch('http://bibliotecabackend.herokuapp.com/libros/todo/'+entrada.libroId+'?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n')
            .then((response)=>{
                return response.json();
            })
            .then((result2)=>{
                
                let contador=0;
                let autores =[];
                
                result2.editoriales.forEach((item, index, array) => {
                  autores.push(
                    <Text style={styles.estiloTexto}>{item.nombre}</Text>
                  );
                  contador++;
                  
                  if (contador === result2.editoriales.length) {
                    var codigoItems = [];
                    var contadorItem = 0;
                    for (let item of result2.items){
                        contadorItem++;
                        if(contadorItem != item.numeroCopia){
                          for(var i = contadorItem;i<item.numeroCopia;i++){
                            codigoItems.push(<View></View>);
                            contadorItem++;
                          }
                        }
                        codigoItems.push(
                          <View>
                            {item.disponibilidad > 0 ?
                            <TouchableOpacity onPress={()=>{
                              this.cambiarCodigoItemAnterior();
                              if(item.disponibilidad==1){
                                  this.setState({
                                    itemSeleccionado: item,
                                    banderaSeleccionItem: true,
                                    lugarArregloItem: item.numeroCopia - 1
                                    //lugarArregloItem: contadorItem - 1
                                  });
                              }

                            }}>
                              <Text style={item.disponibilidad == 1 ? styles.itemDisponible : item.disponibilidad == 2 ? styles.itemPedido : item.disponibilidad == 3 ? styles.itemPrestado : styles.itemReservado}>
                              Nº{item.numeroCopia}     {item.numeroIngreso + '             '}
                              {item.disponibilidad == 1 ? 'Disponible' : item.disponibilidad == 2 ? 'Pedido' : item.disponibilidad == 3 ? 'Prestado' : 'Reservado'}
                              </Text>
                            </TouchableOpacity>
                            :null}
                          </View>
                        )
                    } 
                    
                    variable.push(
                      /*<TouchableOpacity style={styles.padreImagen} onPress={()=> {
                        //this.props.navigation.navigate('InfoLibro',{libro:entrada});
                        //this.props.navigation.navigate('DrawerOpen');
                          this.setState({
                            mostrarModal : true,
                            libro : entrada,
                            codigoItemsModal : codigoItems
                          });
                        }
                      }>
                        <Image style={styles.imagenEstilo} source={{uri:this.state.ruta1}} />
                        <View >
                        <Text style={styles.estiloTexto}>{entrada.titulo}</Text>
                        {autores}
                        </View>
                      </TouchableOpacity>*/
                      
                      <Item /*style={styles.shadow}*/>
                        <TouchableOpacity style={styles.padreImagen} onPress={()=> {
                          //this.props.navigation.navigate('InfoLibro',{libro:entrada});
                          //this.props.navigation.navigate('DrawerOpen');
                            this.setState({
                              mostrarModal : true,
                              libro : entrada,
                              codigoItemsModal : codigoItems
                            });
                          }
                        }>
                          <Image style={styles.imagenEstilo} source={{uri:this.state.ruta1}} />
                          <View >
                          <Text style={styles.estiloTexto}>{entrada.titulo}</Text>
                          {autores}
                          </View>
                        </TouchableOpacity>
                      </Item>
                    
                      );

                    this.setState({
                      codigo: variable
                    }, ()=>{
                        if(entrada.libroId == result[result.length == 5 ? result.length - 2 : result.length - 1].libroId){
                          this.setState({
                            cargoData: true,
                            paginado: this.state.paginado+1
                          });
                        }
                      }
                    );
                  }
                });
              //}                             
            }) 
          
          }else{
            //Esto es para cuando encuentre el quinto libro si es que lo tiene
            this.setState({
              mostrarMas:true
            });
          }
          
        }

    }) 

  }

  async pedirLibro(){
    var fechaActualS = new Date();
    fechaActualS.setTime( fechaActualS.getTime() + -5 * 60 * 60 * 1000 );
    await fetch('http://bibliotecabackend.herokuapp.com/pedidos?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioId: this.props.navigation.getParam('usuario').dni,
        itemId: this.state.itemSeleccionado.itemId,
        fechaInicio: fechaActualS.toJSON(),
        estado: 1,
        tipo: this.state.seleccionPrestamo
      }),
    })//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
    .then((response) => response.json())
    .then((resultado)=>{
        //alert(Object.keys(resultado)[1]);
        //alert(resultado._65);
        //alert(resultado.contenidoError);
        if(Object.keys(resultado).length==2){
          Alert.alert(
            'No se puede realizar el pedido',
            resultado.contenidoError,
            [
              {text: 'Ok', onPress: () => {
                  this.setState({
                    mostrarModal:false,
                    cargoData:false,
                    itemSeleccionado:null,
                    banderaSeleccionItem:false,
                    codigoItemsModal: [],
                    valorBusquedaTrabajado:'',
                    paginado:1,
                    codigo: [],
                    mostrarMas: false
                  },()=>{
                    this.miFuncion(this.state.paginado);
                  });
              }},
            ]
          );
        }else{
          this.setState({
            mostrarModal:false,
            cargoData:false,
            itemSeleccionado:null,
            banderaSeleccionItem:false,
            codigoItemsModal: [],
            valorBusquedaTrabajado:'',
            paginado:1,
            codigo: [],
            mostrarMas: false
          },()=>{
            this.miFuncion(this.state.paginado);
          });
        }

    })
    
  }

  
  render() {
    const { usuario } = this.props.navigation.state.params;
    //const { usuario } = this.props.navigation;
    const rutaImagen = "https://bibliotecabackend.herokuapp.com/archivos/imagen/"+usuario.imagenId+"/1?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n";
    
    const { search } = this.state;


    if(this.state.banderaSeleccionItem){
      //alert(this.state.lugarArregloItem);
      var codigoItems = this.state.codigoItemsModal;
      var item = this.state.itemSeleccionado;
      codigoItems[this.state.lugarArregloItem] = (
        <View>
          {item.disponibilidad>0?
          <TouchableOpacity onPress={()=>{
            this.cambiarCodigoItemAnterior();
          
            this.setState({
              itemSeleccionado:item,
              banderaSeleccionItem:true,
              lugarArregloItem: item.numeroCopia-1
            });
            
          }}>
            <Text style={styles.itemSeleccionado}>
            Nº{item.numeroCopia}     {item.numeroIngreso+'             '}
            {item.disponibilidad==1?'Disponible':item.disponibilidad==2?'Pedido':item.disponibilidad==3?'Prestado':'Reservado'}
            </Text>
          </TouchableOpacity>
          :null}
        </View>
      );
      this.setState({
        banderaSeleccionItem:false
      });
      
    }

    return(
      <View style={{flex:1, backgroundColor: '#f4f4f4'}}>
        
        <View>
          <Cabezera navigation={this.props.navigation} title="Lista de Libros" />
          {/*<View style={styles.menu}>
              <Text style={styles.Texto}> Lista de Libros</Text>
            </View>*/} 
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <Contenedor>
            <Modal visible = {this.state.mostrarModal}
                  //Al parecer con esto al presionar el boton de atras el modal se cierra
                  onRequestClose={() => {  this.cambiarCodigoItemAnterior();
                    this.setState({
                      mostrarModal:false,
                      itemSeleccionado:null,
                      banderaSeleccionItem:false,
                    }); } 
                  }>

              {this.state.libro ? 
              <View style = {styles.containerHeaderModal}> 
                <View style = {styles.boxClose}>     
                </View>

                <View style = {styles.boxTittle}>
                  <Text style={styles.tituloSeccion}>{this.state.libro.titulo}</Text>
                  {this.state.libro.tituloSecundario ? <Text style={styles.textoSeccion}> {this.state.libro.tituloSecundario} </Text> : null}
                </View>

                <View style = {styles.boxClose}>
                  <TouchableOpacity activeOpacity = { .5 } onPress={() => {
                    this.cambiarCodigoItemAnterior();
                    this.setState({
                      mostrarModal:false,
                      itemSeleccionado:null,
                      banderaSeleccionItem:false,
                    });
                  }}>
                    <Icon name = "close" size={22} /*color = '#424242'*/ color = {Colors.secundary_light} />
                  </TouchableOpacity>
                </View> 
              </View>
              : null}

              <ScrollView showsVerticalScrollIndicator = {false}>
                
                {/*
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity style={{marginLeft: 'auto'}} onPress={()=>{
                    this.cambiarCodigoItemAnterior();
                    this.setState({
                      mostrarModal:false,
                      itemSeleccionado:null,
                      banderaSeleccionItem:false,
                    });
                  }}>
                  <Text style={styles.cerrarModalTexto}> x </Text>
                  </TouchableOpacity>
                </View>*/}

                {this.state.libro ?
                  <Contenedor>
                  {/*
                  <View style={styles.container}>
                    <View style={styles.containerModal}>
                  
                      <Text style={styles.tituloSeccion}>{this.state.libro.titulo}</Text>
                      {this.state.libro.tituloSecundario ? <Text style={styles.textoSeccion}> {this.state.libro.tituloSecundario} </Text> : null}
                    */}
                      
                      <ItemModal style={{flexDirection: 'column'}}>
                        <View style={styles.itemH} >
                          <Text style={styles.subTituloModal}>Resumen</Text>
                        </View>
                        <View style={styles.itemB} >
                          <Text style={styles.textEsp}>{this.state.libro.resumen}</Text>
                          <Text style={styles.textEsp}>{this.state.libro.resumen}</Text>
                        </View>      
                      </ItemModal>

                      {/*
                      <View style={styles.contenedorItem}>
                        <View style={styles.itemH} >
                          <Text style={styles.subTituloModal}>Resumen</Text>
                        </View>
                        <View style={styles.itemB} >
                          <Text style={styles.textEsp}>{this.state.libro.resumen}</Text>
                          <Text style={styles.textEsp}>{this.state.libro.resumen}</Text>
                        </View>       
                      </View>*/}

                      <ItemModal style={{flexDirection: 'column'}}>
                        <View style={styles.itemH} >
                          <Text style={styles.subTituloModal}>Información General</Text>
                        </View>
                        <View style={styles.itemB} >
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
                      </ItemModal>

                      <ItemModal style={{flexDirection: 'column'}}>
                        <View style={styles.itemH} >
                          <Text style={styles.subTituloModal}>Lista de Items</Text>
                        </View>
                        <View style={styles.itemB} >
                          {this.state.codigoItemsModal}
                        </View>                    
                      </ItemModal>

                      <ItemModal style={{flexDirection: 'column'}}>
                        <View style={styles.itemH} >
                          <Text style={styles.subTituloModal}>Solicitar Prestamo</Text>
                        </View>
                        <View style={styles.itemB} >
                          <Picker
                            selectedValue = {""+this.state.seleccionPrestamo}
                            style = {{height: 50, alignSelf: 'stretch', textAlign: 'center'}}
                            onValueChange = {(itemValue, itemIndex) =>
                              this.setState({
                                seleccionPrestamo:parseInt(itemValue)
                              })
                            }>
                            <Picker.Item label = "Sala" value="0" />
                            <Picker.Item label = "Domicilio" value="1" />
                          </Picker>    
                        </View>     
                      </ItemModal>

                      <TouchableOpacity style={styles.boton} onPress={() => {
                        //alert(this.state.itemSeleccionado?"Prestando "+this.state.itemSeleccionado.numeroCopia+" para "+(this.state.seleccionPrestamo==0?'Sala':'Domicilio'):'Primero debe escoger un Item.');
                        if(this.state.itemSeleccionado){
                            Alert.alert(
                              'Petición de Item',
                              '¿Está seguro de pedir este libro?',
                              [
                                {
                                  text: 'Cancelar',
                                  onPress: () => {},
                                  style: 'cancel',
                                },
                                {text: 'Pedir', onPress: () => {
                                    this.pedirLibro();
                                    
                                }},
                              ],
                              {cancelable: false},
                            );
                        } else{
                          alert("Primero debe escoger un Item.");
                        }
                        
                      }}>
                          <Text style={styles.textoBoton}> Solicitar </Text>
                      </TouchableOpacity>
                    {/*
                    </View>
                  </View>*/}
                  </Contenedor>
                : null}

              </ScrollView>
            </Modal> 
            
            <View style = {styles.containerSearch}>
              <View style = {styles.boxSearch}>
                <SearchBar
                  lightTheme
                  round
                  placeholder = "Buscar..."
                  containerStyle = {{backgroundColor: Colors.secundary_light, borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                  inputStyle = {{backgroundColor: Colors.secundary}}
                  inputContainerStyle = {{backgroundColor: Colors.secundary}}

                  onChangeText = {(text) => this.setState({valorBusqueda:text})}
                  value = {this.state.valorBusqueda}
                />
              </View>
              <View style = {styles.boxButtom}>
                <TouchableOpacity style = {styles.buttomSearch} activeOpacity = { .5 } onPress={() => {
                  this.setState({
                    mostrarMas: false,
                    cargoData: false,
                    valorBusquedaTrabajado: this.state.valorBusqueda,
                    paginado: 1,
                    codigo: []
                  } , () => {this.miFuncion(this.state.paginado);} )
                }}>
                  <Text style={styles.textButtom}> Buscar </Text>
                </TouchableOpacity>
              </View>
            
            </View>
            
            {/*
            <View style={{padding:10,flexDirection:'row',flexWrap:'wrap',alignItems: 'center'}} >
              <TextInput style={{height: 40, width:200, borderColor: 'gray', borderWidth: 1,marginRight:17}}
                value = {this.state.valorBusqueda} onChangeText={(text) => this.setState({valorBusqueda:text})}/>
              <View style={{width:80,heigth:40}}>
                <Button title="Buscar" color="#841584" onPress={() => {
                  this.setState({
                    mostrarMas: false,
                    cargoData: false,
                    valorBusquedaTrabajado: this.state.valorBusqueda,
                    paginado: 1,
                    codigo: []
                  } , () => {this.miFuncion(this.state.paginado);} )
                }}/>
              </View>
            </View>
            */}
            
            {this.state.cargoData ? this.state.codigo : null}
            
            {this.state.mostrarMas ? (
              <ItemImagen style = {{alignItems: 'center', justifyContent: 'center', paddingBottom:20}}>
                <View style = {{width:200, heigth:40}}>
                  <Button title = "Mostrar más" color={Colors.primary} onPress={()=>{
                      this.setState({
                        mostrarMas: false,
                        cargoData: false
                      },()=>{
                        this.miFuncion(this.state.paginado);
                      })
                    }}
                  />
                </View>
              </ItemImagen>
            ) : null}

          </Contenedor>
        </ScrollView>
      
      </View>
      
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

  containerSearch:{
    flexDirection: 'row',
    borderBottomColor: Colors.secundary_dark2,
    borderTopColor: Colors.secundary_dark2,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF'
  },

  boxButtom: {
    flex: 1,
    marginLeft:10,
    marginRight:10,
    marginTop: 13,
    marginBottom: 13,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },

  boxSearch: {
    flex: 3,
  },

  buttomSearch: {
    flex: 1,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: Colors.primary,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },

  textButtom:{
    color:'#fff',
    textAlign:'center',    
  },

  shadow:{
    elevation: 2
  },

  padreImagen:{
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    flexDirection:'row'
  },

  containerHeaderModal:{
    flexDirection: 'row',
    borderBottomColor: Colors.secundary_dark,
    //borderTopColor: Colors.secundary_dark,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    //backgroundColor: '#FFFFFF',
    //backgroundColor: Colors.secundary_dark,
    backgroundColor: Colors.primary
  },

  boxClose: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#FFFFFF',
    //backgroundColor: Colors.secundary_dark,
    backgroundColor: Colors.primary
  },

  /*
  buttomClose: {
    height: 33,
    width: 33,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  */

  boxTittle: {
    flex: 3,
    //backgroundColor: '#FFFFFF'
    //backgroundColor: Colors.secundary_dark,
    backgroundColor: Colors.primary,
    padding: 10
  },

  tituloSeccion: {
    fontSize: 18, //22
    //marginLeft:12,
    //marginBottom:5,
    textAlign:'center',
    color: Colors.secundary_light
    //color: Colors.tertiary, 
  },

  textoSeccion: {
    fontSize: 10, //13,
    //marginLeft:16,
    //marginBottom:7,
    textAlign:'center',
    color: Colors.secundary_light
    //color: Colors.tertiary,
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

  imagenEstilo:{
    width:80,
    height:80,
    borderRadius: 100,
    marginRight:20
  },
  estiloTexto:{
    width:200
  },

  subTituloModal:{
    fontSize: 15, //20,
    color: Colors.secundary_light
    //color: Colors.tertiary,
  },

  textEsp:{
    marginBottom:5,
    fontSize:14,
  },
  
  itemDisponible:{
    backgroundColor: Colors.libroDisponible,
    borderRadius:20,
    padding:15,
    marginTop:10,
    fontSize: 11, //20,
  },

  itemPedido:{
    backgroundColor: Colors.libroPedido,
    borderRadius:20,
    padding:15,
    marginTop:10,
    //color: Colors.secundary_light,
    fontSize: 11, //20,
  },

  itemPrestado:{
    backgroundColor: Colors.libroNoDisponible,
    borderRadius:20,
    padding:15,
    marginTop:10,
    //color: Colors.secundary_light,
    fontSize: 11, //20,
  },

  itemReservado:{
    backgroundColor:'blue',
    borderRadius:20,
    padding:15,
    marginTop:10,
    fontSize: 11, //20,
  },

  itemSeleccionado:{
    backgroundColor: Colors.libroSeleccionado,
    borderRadius:20,
    padding:15,
    marginTop:10,
    color: Colors.secundary_light,
    fontSize: 11, //20,
  },

  boton:{
    width: ancho/1.2,
    //backgroundColor: Colors.secundary_dark,
    backgroundColor: Colors.primary,
    borderRadius: altura/23.7,
    marginVertical: altura/59.2,
    paddingVertical: altura/45.5
  },

  textoBoton:{
    fontSize: 16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },

  contenedorItem: {
    flex: 1,
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

})