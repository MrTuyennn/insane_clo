import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const ViewCustom = ({ style, source, styleImage }) => {
    return (
        <View style={[styles.view, { style }]}>
            <Image style={[styles.image, { styleImage }]} source={source}></Image>
        </View>
    )
}

export default ViewCustom

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 35,
        height:90,
        width:90,
        backgroundColor:'white',
        margin:10, 
        borderRadius:10
    },
    image: {
        height: 70,
        width: 70,
    }
})
