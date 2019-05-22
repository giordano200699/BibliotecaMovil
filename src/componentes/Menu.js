import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
//import DrawerNavigator from '../componentes/Drawer';
import Menu1 from '../componentes/Menu1';
import Perfil from '../paginas/Perfil';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';

/*export default class Menu extends Component {
  render() {
    return(
      <View style={styles.container}>
        <DrawerNavigator usuario={this.props.navigation.getParam('usuario')}/>
      </View>
    )
  }
}*/


const Menu = createDrawerNavigator({
  MiCuenta: {
      screen: Perfil
  },
  "Lista de Libros": {
      screen: Menu1
  },
}//,
//DrawerConfig
);
export default createAppContainer(Menu);

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center'
  }
})*/