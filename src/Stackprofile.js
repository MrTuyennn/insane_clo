import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import theme from './utils/theme'
import Profile from './screens/profile';
import UpdateProfile from './screens/updateprofile';
import ChangePass from './screens/changepass'

const Stack = createStackNavigator();

export default class Stackprofile extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="profile">
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown:false
          }}></Stack.Screen>
        <Stack.Screen 
         name="updateprofile"
         component={UpdateProfile}
         options={{
            headerStyle: {
              backgroundColor: theme.COLOR_PRIMARY,
            },
            headerTitle: 'Cập nhập thông tin',
            headerTintColor: 'white',
          }}></Stack.Screen>
          <Stack.Screen 
         name="changepass"
         component={ChangePass}
         options={{
            headerStyle: {
              backgroundColor: theme.COLOR_PRIMARY,
            },
            headerTitle: 'Cập nhập mật khẩu',
            headerTintColor: 'white',
          }}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}
