import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ButtonCustom = ({title, style, color, onPress, source}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.bg, style]}>
        <Image source={source}></Image>
        <Text style={color}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#ff66a3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
