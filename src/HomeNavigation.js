import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStore from '../src/Stackstore';
import HomeProfile from '../src/Stackprofile'
import Icon from 'react-native-vector-icons/FontAwesome5'
import theme from "./utils/theme"
const Tab = createBottomTabNavigator();


const HomeNavigation = () => {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarLabel: '',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let Iconsize;
          if (route.name === 'homestore') {
            iconName = 'store'
            Iconsize = focused ? 25 : 15
          } else if (route.name === 'homeprofile') {
            iconName = 'user-tag'
            Iconsize = focused ? 25 : 15
          }
          return <Icon name={iconName} size={Iconsize} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.COLOR_PRIMARY,
        inactiveTintColor: 'gray',
        style: {
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 10,
          borderRadius: 20,
          marginHorizontal: 100
        },
      }}
    >

      <Tab.Screen name="homestore"
        component={HomeStore}
        options={{
          tabBarLabel: 'Store'
        }}></Tab.Screen>

      <Tab.Screen name="homeprofile"
        component={HomeProfile}
        options={{
          tabBarLabel: 'Profile'
        }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default HomeNavigation

