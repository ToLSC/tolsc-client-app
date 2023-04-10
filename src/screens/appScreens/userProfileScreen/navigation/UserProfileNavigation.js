import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, ThemeContext } from '../../../../context/ThemeContext';
import UserProfileScreenComponent from '../components/UserProfileScreen/UserProfileScreenComponent';
import EditProfileScreenComponent from '../components/EditProfileScreen/EditProfileScreenComponent';

const Stack = createNativeStackNavigator();

export default function UserProfileNavigation({change, setUserStatus}){

    //Variables - Theme context
    const {setDarkThemeEnabled} = useContext(ThemeContext);

    //Change theme
    const changeThemeContext = (data) => {
        setDarkThemeEnabled(data);
        change(data);
    }

    //Change user data
    const changeUserStatus = (data) => {
        setUserStatus(data);
    }

    return(
        <ThemeProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='UserProfile' component={UserProfileScreenComponent} initialParams={{change: changeThemeContext, setUserStatus: changeUserStatus}}/>
                <Stack.Screen name='EditProfile' component={EditProfileScreenComponent} initialParams={{setUserStatus: changeUserStatus}}/>                        
            </Stack.Navigator>
        </ThemeProvider>
    )
}