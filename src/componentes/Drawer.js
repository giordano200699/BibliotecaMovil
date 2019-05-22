import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';

import Menu1 from '../componentes/Menu1';
import Perfil from '../paginas/Perfil';

const WIDTH = Dimensions.get('window').width;

/*const DrawerConfig = {
    drawerWidth: WIDTH*0.83
}*/

const DrawerNavigator = createDrawerNavigator({
    MiCuenta: {
        screen: Perfil
    },
    "Lista de Libros": {
        screen: Menu1
    },
}//,
//DrawerConfig
);
export default createAppContainer(DrawerNavigator);