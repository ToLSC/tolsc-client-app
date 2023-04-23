import React from 'react';
import LoginScreenComponent from '../screens/loginScreens/loginScreen/LoginScreenComponent';
import RegisterScreenComponent from '../screens/loginScreens/registerScreen/RegisterScreenComponent';
import ForgotPasswordScreenComponent from '../screens/loginScreens/forgotPasswordScreen/ForgotPasswordScreenComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function LoginNavigation({setUserData}){
    return(
        <ThemeProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='loginScreen' component={LoginScreenComponent} initialParams={{setUserData: setUserData}}/>
                <Stack.Screen name='registerScreen' component={RegisterScreenComponent} initialParams={{setUserData: setUserData}}/>
                <Stack.Screen name='forgotPasswordScreen' component={ForgotPasswordScreenComponent}/>                  
            </Stack.Navigator>
        </ThemeProvider>
    )
}