import React, { Component } from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import MainNavigation from './MainNavigation'
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
