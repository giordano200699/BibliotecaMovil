import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
///import Icon from '../../node_modules/react-native-vector-icons/fonts.gradle';

export default class BotonMenu extends React.Component{
    render(){
        return(
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    iconoMenu:{
        zIndex:9,
        position:'absolute',
        top:40,
        left:20
    }
})