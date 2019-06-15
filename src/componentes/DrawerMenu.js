//import DrawerNavigator from '../componentes/Drawer';
import Libros from '../paginas/Libros';
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
  "Mi Cuenta": { screen: Perfil },
  "Lista de Libros": { screen: Libros },
}

);

export default createAppContainer(Menu);