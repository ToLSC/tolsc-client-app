import React, { useContext, useState, useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TranslatorScreenComponent from '../screens/appScreens/translatorScreen/TranslatorScreenComponent';
import HistoryScreenComponent from '../screens/appScreens/historyScreen/HistoryScreenComponent';
import UserProfileScreenComponent from '../screens/appScreens/userProfileScreen/UserProfileScreenComponent';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigation({setUserStatus}){


    const {darkThemeEnabled, setDarkThemeEnabled} = useContext(ThemeContext);
    const [isDarkThemeEnabled, changeTheme] = useState(darkThemeEnabled);

    const changeThemee = () => { changeTheme(!isDarkThemeEnabled) }

    return(
        <ThemeProvider>
            <Tab.Navigator 
                screenOptions={{headerShown: false, tabBarStyle: { 
                                                                    backgroundColor: isDarkThemeEnabled? '#181818': 'white', 
                                                                    borderTopColor: isDarkThemeEnabled? '#181818': 'white'}}}>
                <Tab.Screen 
                    name='Translator' 
                    component={TranslatorScreenComponent}    
                    options={({ navigation }) => ({
                        title: "Translator",
                        tabBarActiveTintColor: '#39B4C8',
                        tabBarIcon: ({ focused, color }) => (<MaterialIcons name="translate" size={23} color="#39B4C8" />)})} 
                    />
                <Tab.Screen 
                    name='History' component={HistoryScreenComponent}
                    options={({ navigation }) => ({
                        title: "History",
                        tabBarActiveTintColor: '#39B4C8',
                        tabBarIcon: ({ focused, color }) => (<MaterialIcons name="history" size={25} color="#39B4C8" />)})} />
                <Tab.Screen 
                    name='Profile'
                    children={() => <UserProfileScreenComponent change={changeThemee} setUserStatus={setUserStatus}/>}
                    options={({ navigation }) => ({
                        title: "Settings",
                        tabBarActiveTintColor: '#39B4C8',
                        tabBarIcon: ({ focused, color }) => (<MaterialIcons name="settings" size={23} color="#39B4C8"/>)})} />
            </Tab.Navigator>
        </ThemeProvider>
    )
}