import React, { useContext, useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { ThemeProvider } from '../context/ThemeContext';
import { AccountContext, AccountProvider } from '../context/AccountContext';
import LoginNavigation from './LoginNavigation';
import AppNavigation from './AppNavigation';

export default function MainNavigation(){

    //Variables - state
    const [estado, setEstado] = useState(false);
    const {user, setUser, setLoginStatus} = useContext(AccountContext); 
    
    //Hook - change login status onChange user information
    useEffect(() => { if(user && !estado) setEstado(true) }, [user])

    //Change user data - Login
    const getUserData = (data) => {
        if(data){
            setUser(data);
            setLoginStatus(true);
            setEstado(false);
        }
    } 

    //Change user status - Logout
    const getUserStatus = (data) =>{
        if(!data){
            setUser(null);
            setEstado(data);   
        }
    }

    return(
        <ThemeProvider>
            <NavigationContainer>
                <AccountProvider>
                    {estado? <AppNavigation setUserStatus={getUserStatus}/> :  <LoginNavigation setUserData={getUserData}/> }
                </AccountProvider>
            </NavigationContainer>
        </ThemeProvider>
    )
}