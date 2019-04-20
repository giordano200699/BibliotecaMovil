import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './src/Main';
import Hola from './src/paginas/Hola';

const NavegacionPrincipal = createStackNavigator({
    Main: {screen: Main, navigationOptions: { header: null,}},
    Hola: {screen: Hola, navigationOptions: { header: null,}},
})

const Navegador = createAppContainer(NavegacionPrincipal)

export default Navegador;