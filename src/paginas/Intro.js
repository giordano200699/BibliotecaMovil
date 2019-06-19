/*This is an example of React Native App Intro Slider */
import React from 'react';
//import react in project 

import { StyleSheet, AsyncStorage, View, Text, ActivityIndicator } from 'react-native';
//import all the required component

import AppIntroSlider from 'react-native-app-intro-slider';
//import AppIntroSlider to use it


import Navegacion from './../../Navegacion';
import DrawerMenu from '../componentes/DrawerMenu';


export default class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      loading: true,
      //To show the main page of the app
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ showRealApp: !! value, loading: false });
    });
  }

  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
        this.setState({ showRealApp: true });
    });    
  };

  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
        this.setState({ showRealApp: true });
    }); 
  };

  render() {
    if (this.state.loading) return <ActivityIndicator size="large" />
    //const usuario = this.props.navigation.getParam('usuario');

    //alert(usuario.nombres);
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
        <Navegacion/>
        //<DrawerMenu usuario = {usuario}/>
      );
    } else {
      //Intro slides
      return (
        <AppIntroSlider
          slides={slides}
          //comming from the JsonArray below
          onDone={this._onDone}
          //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    image: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginTop: 16,
    },
});

const slides = [
    {
        key: 's1',
        title: 'Titu 1',
        titleStyle: styles.title,
        text: 'Subt 1',
        textStyle: styles.text,
        /*image: {
        uri:
            'http://aboutreact.com/wp-content/uploads/2018/08/mobile_recharge.png',
        },*/
        image: require('../imagenes/BiblioFisi.png'),
        imageStyle: styles.image,
        backgroundColor: '#20d2bb',
    },
    {
        key: 's2',
        title: 'Titu 2',
        titleStyle: styles.title,
        text: 'Sub 2',
        image: require('../imagenes/flechaAtras.png'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 's3',
        title: 'Titu 3',
        titleStyle: styles.title,
        text: 'Sub 3',
        image: require('../imagenes/flechaIzquierda.png'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    },
];