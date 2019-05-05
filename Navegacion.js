import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './src/Main';
import Perfil from './src/paginas/Perfil';

const NavegacionPrincipal = createStackNavigator({
    Main: {screen: Main, navigationOptions: { header: null,}},
    Perfil: {screen: Perfil, navigationOptions: { header: null}},
})

const Navegador = createAppContainer(NavegacionPrincipal)

export default Navegador;