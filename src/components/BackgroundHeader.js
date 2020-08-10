import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import theme from '../utils/theme'

const BackgroundHeader = (style) => {
    return (
        <View style={{style}}>
        <View style={styles.ViewContainer}></View>
        <Svg height="50%" width="100%" style={styles.svg} viewBox="0 0 1440 320">
            <Path 
              fill={theme.COLOR_PRIMARY} 
              d="M0,32L40,64C80,96,160,160,240,165.3C320,171,400,117,480,90.7C560,64,640,64,720,85.3C800,107,880,149,960,149.3C1040,149,1120,107,1200,96C1280,85,1360,107,1400,117.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
            </Path>
        </Svg>
        </View>
    )
}

export default BackgroundHeader

const styles = StyleSheet.create({
    ViewContainer:{
        backgroundColor:theme.COLOR_PRIMARY,
        height:300,

    },
    svg:{
        position: 'absolute',
        right:0,
        left:0,
        top:270,
        width:Dimensions.get('window').width
    }
})
