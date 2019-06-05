import React, { Component } from 'react'
import {
  View,
  Text,TextInput,Button,
  StyleSheet,ScrollView,Dimensions,StatusBar,Image,Alert,TouchableOpacity,Modal,Picker
} from 'react-native'



var dimensiones = Dimensions.get('window');
var altura = dimensiones.height;
var ancho = dimensiones.width;

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
      mostrarMas:false
    };
    this.miFuncion = this.miFuncion.bind(this);
    this.cambiarCodigoItemAnterior = this.cambiarCodigoItemAnterior.bind(this);
    this.pedirLibro = this.pedirLibro.bind(this);
    this.miFuncion(1);
}
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
                        for (let item of result2.items){
                            codigoItems.push(
                              <View>
                                {item.disponibilidad>0?
                                <TouchableOpacity onPress={()=>{

                                  this.cambiarCodigoItemAnterior();
                                  if(item.disponibilidad==1){
                                      this.setState({
                                        itemSeleccionado:item,
                                        banderaSeleccionItem:true,
                                        lugarArregloItem: item.numeroCopia-1
                                      });
                                  }

                                }}>
                                  <Text style={item.disponibilidad==1?styles.itemDisponible:item.disponibilidad==2?styles.itemPedido:item.disponibilidad==3?styles.itemPrestado:styles.itemReservado}>
                                  Nº{item.numeroCopia}     {item.numeroIngreso+'             '}
                                  {item.disponibilidad==1?'Disponible':item.disponibilidad==2?'Pedido':item.disponibilidad==3?'Prestado':'Reservado'}
                                  </Text>
                                </TouchableOpacity>
                                :null}
                              </View>
                            )
                        } 
                        
                        variable.push(
                          <TouchableOpacity style={styles.padreImagen} onPress={()=> {
                            //this.props.navigation.navigate('InfoLibro',{libro:entrada});
                            //this.props.navigation.navigate('DrawerOpen');
                              this.setState({
                                mostrarModal:true,
                                libro:entrada,
                                codigoItemsModal:codigoItems
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
                          codigo:variable
                        },()=>{
                          if(entrada.libroId== result[result.length==5?result.length-2:result.length-1].libroId){
                            this.setState({
                              cargoData:true,
                              paginado: this.state.paginado+1
                            });
                          }
                        });
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
    //alert(this.state.itemSeleccionado.itemId);
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
        fechaInicio: "2019-05-28T22:43:00.000",
        estado: 1,
        tipo: this.state.seleccionPrestamo
      }),
    })//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
    .then((response)=>{
        return response.json();
    })
    .then(async (result)=>{
        
        this.setState({
          mostrarModal:false,
          cargoData:false,
          itemSeleccionado:null,
          banderaSeleccionItem:false,
          codigoItemsModal: []
        },()=>{
          this.miFuncion();
        });
    });
    
  }

  

  render() {
    const { usuario } = this.props.navigation.state.params;
    const rutaImagen = "https://bibliotecabackend.herokuapp.com/archivos/imagen/"+usuario.imagenId+"/1?Content-Type=application/json&clave=QDm6pbKeVwWikPvpMSUYwp0tNnxcaLoYLnyvLQ4ISV39uQOgsjTEjS0UNlZHwbxl2Ujf30S31CSKndwpkFeubt5gJHTgFlq7LeIaSYc0jNm44loPty2ZK1nI0qisrt2Xwq0nFhdp8H3kdpyL5wVZLH7EpSE6IO0cHAOGOfSpJjF36eiCuXJ3gkOfX8C4n";
     
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor='#0A1970' barStyle='light-content'/>
        <View style={styles.menu}>
            <Text style={styles.Texto}> Lista de Libros</Text>
        </View>

        <Modal visible={this.state.mostrarModal} 
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{marginLeft: 'auto'}} onPress={()=>{
                this.cambiarCodigoItemAnterior();
                this.setState({
                  mostrarModal:false,
                  itemSeleccionado:null,
                  banderaSeleccionItem:false,

                });
              }}>
              <Text style={styles.cerrarModalTexto}>Cerrar</Text>
              </TouchableOpacity>
            </View>
            {this.state.libro?
              <View style={styles.container}>
                <View style={styles.containerModal}>
                  <Text style={styles.tituloSeccion}>{this.state.libro.titulo}</Text>
                  {this.state.libro.tituloSecundario?<Text style={styles.textoSeccion} >{this.state.libro.tituloSecundario}</Text>:null}

                  <Text style={styles.subTituloModal}>Resumen</Text>
                  <Text style={styles.textEsp}>{this.state.libro.resumen}</Text>
                  <Text style={styles.textEsp}>{this.state.libro.resumen}</Text>

                  <Text style={styles.subTituloModal}>Información General</Text>
                  <Text style={styles.textEsp}>Clasificacion: {this.state.libro.clasificacion}</Text>
                  <Text style={styles.textEsp}>Edición: {this.state.libro.edicion}</Text>
                  <Text style={styles.textEsp}>Año: {this.state.libro.anio}</Text>
                  <Text style={styles.textEsp}>Tomo: {this.state.libro.tomo}</Text>
                  <Text style={styles.textEsp}>ISBN: {this.state.libro.isbn}</Text>
                  <Text style={styles.textEsp}>Extensión: {this.state.libro.extension}</Text>
                  <Text style={styles.textEsp}>Dimensiones: {this.state.libro.dimensiones}</Text>
                  <Text style={styles.textEsp}>Observaciones: {this.state.libro.observaciones}</Text>
                  <Text style={styles.textEsp}>Acompañamiento: {this.state.libro.acompaniamiento}</Text>

                  <Text style={styles.subTituloModal}>Lista de Items</Text>
                  {this.state.codigoItemsModal}

                  <Picker
                    selectedValue={""+this.state.seleccionPrestamo}
                    style={{height: 50, alignSelf: 'stretch', textAlign: 'center'}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        seleccionPrestamo:parseInt(itemValue)
                      })
                    }>
                    <Picker.Item label="Sala" value="0" />
                    <Picker.Item label="Domicilio" value="1" />
                  </Picker>

                  <TouchableOpacity style={styles.boton} onPress={() => {
                    //alert(this.state.itemSeleccionado?"Prestando "+this.state.itemSeleccionado.numeroCopia+" para "+(this.state.seleccionPrestamo==0?'Sala':'Domicilio'):'Primero debe escoger un Item.');
                    if(this.state.itemSeleccionado){
                      if(this.props.navigation.getParam('usuario').estado==0){
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
                      }else{
                        if(this.props.navigation.getParam('usuario').estado==1){
                          alert("El usuario ya ha pedido un Libro");
                        }else if(this.props.navigation.getParam('usuario').estado==2){
                          alert("El usuario ya tiene prestado un Libro");
                        }else{
                          alert("El usuario ya ha reservado un Libro");
                        }
                        
                      }

                      

                      
                    }else{
                      alert("Primero debe escoger un Item.");
                    }
                    
                  }}>
                      <Text style={styles.textoBoton}> Acceder </Text>
                  </TouchableOpacity>

                </View>
              </View>
            :null}
          </ScrollView>
        </Modal>  
            <View style={{padding:10,flexDirection:'row',flexWrap:'wrap',alignItems: 'center'}} >
              <TextInput style={{height: 40, width:200, borderColor: 'gray', borderWidth: 1,marginRight:17}}
               value={this.state.valorBusqueda} onChangeText={(text) => this.setState({valorBusqueda:text})}/>
              <View style={{width:80,heigth:40}}>
                <Button title="Buscar" color="#841584" onPress={()=>{
                  this.setState({
                    mostrarMas:false,
                    cargoData:false,
                    valorBusquedaTrabajado:this.state.valorBusqueda,
                    paginado:1,
                    codigo:[]
                  },()=>{
                    this.miFuncion(this.state.paginado);
                  })
                  }}
                />
              </View>
            </View>
              {this.state.cargoData?this.state.codigo:null}
              {this.state.mostrarMas?(
                <View style={{alignItems: 'center',justifyContent: 'center',paddingBottom:20}}>
                  <View style={{width:200,heigth:40}}>
                    <Button title="Mostrar más" color="#841584" onPress={()=>{
                        this.setState({
                          mostrarMas:false,
                          cargoData:false
                        },()=>{
                          this.miFuncion(this.state.paginado);
                        })
                      }}
                    />
                  </View>
                </View>
              ):null}


              
            
          
        
        
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
  },

  tituloSeccion:{
    fontSize:25,
    marginLeft:12,
    marginBottom:5
  },

  textoSeccion:{
    fontSize: 15,
    marginLeft:16,
    marginBottom:7
  },

  subTituloModal:{
    fontSize:23
  },

  textEsp:{
    marginBottom:5,
    fontSize:14
  },
  
  itemDisponible:{
    backgroundColor:'green',
    borderRadius:20,
    padding:15,
    marginTop:10
  },

  itemPedido:{
    backgroundColor:'orange',
    borderRadius:20,
    padding:15,
    marginTop:10
  },

  itemPrestado:{
    backgroundColor:'red',
    borderRadius:20,
    padding:15,
    marginTop:10
  },

  itemReservado:{
    backgroundColor:'blue',
    borderRadius:20,
    padding:15,
    marginTop:10
  },
  itemSeleccionado:{
    backgroundColor:'white',
    borderRadius:20,
    padding:15,
    marginTop:10
  },
  boton:{
    width: ancho/1.2,
    backgroundColor:'#001970',
    borderRadius: altura/23.7,
    marginVertical: altura/59.2,
    paddingVertical: altura/45.5
  },
  textoBoton:{
    fontSize: 16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }

})