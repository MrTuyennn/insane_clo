import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Store from '../src/screens/store';
import Addstore from '../src/screens/addstore';
import Infor from '../src/screens/inforproduct';
import theme from '../src/utils/theme';
import List from '../src/screens/lisproduct';
import Update from '../src/screens/update'
const Stack = createStackNavigator();

export default class Stackstore extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="store">
        <Stack.Screen
          name="store"
          component={Store}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="addstore"
          component={Addstore}
          options={{
            headerStyle: {
              backgroundColor: theme.COLOR_PRIMARY,
            },
            headerTitle: 'Thêm sản phẩm',
            headerTintColor: 'white',
          }}></Stack.Screen>
        <Stack.Screen
          name="inforproduct"
          component={Infor}
          options={{
            headerStyle: {
              backgroundColor: theme.COLOR_PRIMARY,
            },
            headerTitle: 'Thông tin sản phẩm',
            headerTintColor: 'white',
          }}></Stack.Screen>
        <Stack.Screen
          name="listproduct"
          component={List}
          options={{
            headerStyle: {
              backgroundColor: theme.COLOR_PRIMARY,
            },
            headerTitle: 'Tất cả sản phẩm',
            headerTintColor: 'white',
          }}></Stack.Screen>

        <Stack.Screen
          name="update"
          component={Update}
          options={{
            headerStyle: {
              backgroundColor: theme.COLOR_PRIMARY,
            },
            headerTitle: 'Cập nhập sản phẩm',
            headerTintColor: 'white',
          }}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}
