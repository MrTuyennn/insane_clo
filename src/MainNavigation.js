import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Regiter from './screens/register';
import HomeNavigation from './HomeNavigation';
import theme from './utils/theme'
const Stack = createStackNavigator();


class StackLogin extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="login">

                <Stack.Screen
                name="login"
                component={Login}
                options={{
                  headerShown:false,
                }}></Stack.Screen>

                <Stack.Screen
                name="register"
                component={Regiter}
                options={{
                    headerStyle:{
                        backgroundColor:theme.COLOR_PRIMARY
                    },
                    headerTitle:'Đăng kí tài khoản',
                    headerTintColor: 'white',
                }}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}

export default class MainNavigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="stacklogin">

                    <Stack.Screen
                    name="stacklogin"
                    component={StackLogin}
                    options={{
                        headerShown:false
                    }}></Stack.Screen>

                    <Stack.Screen
                    name="homeNavigation"
                    component={HomeNavigation}
                    options={{
                        headerShown:false
                    }}></Stack.Screen>

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
