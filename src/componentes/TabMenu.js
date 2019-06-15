import React, { Component } from 'react'

import Libros from '../paginas/Libros';
import Perfil from '../paginas/Perfil';

import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';

const TabNavegacion = createBottomTabNavigator({
    "Perfil de Usuario": Perfil,
    "Lista de Libros": Libros,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let IconComponent = Entypo;
        let iconName;
        if (routeName === 'Perfil de Usuario') {
          //iconName = `user${focused ? '' : '-outline'}`;
          iconName = 'user';
        } else if (routeName === 'Lista de Libros') {
          //iconName = `book${focused ? '' : '-outline'}`;
          iconName = 'book';
        }

        return <IconComponent name={iconName} size={25}/>;
      }
    })
  }
);

export default createAppContainer(TabNavegacion);
