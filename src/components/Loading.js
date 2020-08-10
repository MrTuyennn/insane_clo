import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-spinkit';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Loading = ({flag}) =>  {
    return (
      <View  style={flag ? styles.container : {display: 'none'}}>
        <View style={styles.overplay}></View>
        <Spinner isVisible={true}  size={50} type="Circle" color="white"></Spinner>
      </View>
    )
  }

export default  Loading
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex:999,
    alignItems:'center',
    justifyContent:'center'
  },
  overplay:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor:'black',
    opacity:0.4
  }
});
