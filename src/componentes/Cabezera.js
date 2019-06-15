import React from "react";
import { Header } from "react-native-elements";
import {Platform, StyleSheet} from 'react-native';
import MenuHamburgesa from "./MenuHamburguesa";
import {Colors} from '../styles'

const Cabezera = props => {
  return (
    <Header
      leftComponent = {<MenuHamburgesa navigation={props.navigation} />}
      centerComponent = {{ text: props.title, style: { color: "#fff", fontWeight: "bold" } }}
      statusBarProps = {{ barStyle: 'light-content', backgroundColor: Colors.primary_dark }}
      containerStyle={{ marginTop: Platform.OS === 'ios'? 0: - 30, backgroundColor: Colors.primary, justifyContent: 'space-around'}}
    />
  );
};

export default Cabezera;

const styles = StyleSheet.create({
  
  statusBar : {
    backgroundColor: Colors.primary_dark,
  },

})