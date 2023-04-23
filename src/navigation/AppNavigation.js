import React, { useContext, useState, useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import TranslatorScreenComponent from '../screens/appScreens/translatorScreen/TranslatorScreenComponent';
import HistoryScreenComponent from '../screens/appScreens/historyScreen/HistoryScreenComponent';
import UserProfileNavigation from '../screens/appScreens/userProfileScreen/navigation/UserProfileNavigation';
const Tab = createBottomTabNavigator();

export default function AppNavigation({setUserStatus}){
    //Variables - state
    const {darkThemeEnabled, setDarkThemeEnabled } = useContext(ThemeContext);
    const [isDarkThemeEnabled, changeTheme] = useState(darkThemeEnabled);
    
    useEffect(() => { changeThemee(darkThemeEnabled) }, [darkThemeEnabled]);

    //Change color theme
    const changeThemee = (data) => { 
        setDarkThemeEnabled(data);
        changeTheme(data); 
    }
    
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
                        unmountOnBlur: true,
                        title: "History",
                        tabBarActiveTintColor: '#39B4C8',
                        tabBarIcon: ({ focused, color }) => (<MaterialIcons name="history" size={25} color="#39B4C8" />)})} />

                <Tab.Screen 
                    name='Profile'
                    children={() => <UserProfileNavigation change={changeThemee} setUserStatus={setUserStatus}/>}
                    options={({ navigation }) => ({
                        title: "Settings",
                        tabBarActiveTintColor: '#39B4C8',
                        tabBarIcon: ({ focused, color }) => (<MaterialIcons name="settings" size={23} color="#39B4C8"/>)})} />
            </Tab.Navigator>
        </ThemeProvider>
    )
}