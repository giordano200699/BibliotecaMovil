import React from "react";
import { Icon } from "react-native-elements";

const MenuHamburguesa = props => {
  return (
    <Icon
      color = "#fff"
      name = "menu"
      onPress = {() => props.navigation.toggleDrawer()}
    />
  );
};

export default MenuHamburguesa;