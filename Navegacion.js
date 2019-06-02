import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './src/Main';
import Perfil from './src/paginas/Perfil';
import Menu from './src/componentes/Menu';
import InfoLibro from "./src/componentes/InfoLibro";

import TabStack from './src/componentes/TabStack';

const NavegacionPrincipal = createStackNavigator({
    Main: {screen: Main, navigationOptions: { header: null,}},
    Perfil: {screen: Perfil, navigationOptions: { header: null}},
    //Menu: {screen: Menu, navigationOptions: { header: null}},
    TabStack: {screen: TabStack, navigationOptions: { header: null}},
    InfoLibro: {screen: InfoLibro, navigationOptions: { header: null}},
})

const Navegador = createAppContainer(NavegacionPrincipal)

export default Navegador;