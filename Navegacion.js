import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './src/Main';
import Perfil from './src/paginas/Perfil';
import Libros from './src/paginas/Libros';
import DrawerMenu from './src/componentes/DrawerMenu';
import InfoLibro from "./src/componentes/InfoLibro";
import TabMenu from './src/componentes/TabMenu';

const NavegacionPrincipal = createStackNavigator({
    Main: {screen: Main, navigationOptions: { header: null,}},
    //Perfil: {screen: Perfil, navigationOptions: { header: null}},
    DrawerMenu: {screen: DrawerMenu, navigationOptions: { header: null}},
    //TabMenu: {screen: TabStack, navigationOptions: { header: null}},
    //InfoLibro: {screen: InfoLibro, navigationOptions: { header: null}},
})

const Navegador = createAppContainer(NavegacionPrincipal)

export default Navegador;