import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar,SafeAreaView } from 'react-native'
import MainNavigation from './MainNavigation'
import HomeNavigation from './HomeNavigation'
import Register from '../src/screens/register'
import theme from './utils/theme'
console.disableYellowBox = true;
export default class App extends Component {
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
            <StatusBar barStyle = "dark" hidden = {false} backgroundColor = {theme.COLOR_PRIMARY} translucent = {false}/>
            <MainNavigation></MainNavigation>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
