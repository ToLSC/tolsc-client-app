import React, { useContext, useEffect, useRef, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginNavigation from './LoginNavigation';
import AppNavigation from './AppNavigation';
import { ThemeProvider } from '../context/ThemeContext';
import { AccountContext, AccountProvider } from '../context/LoginContext';

export default function MainNavigation(){

    const [estado, setEstado] = useState(false);
    const {user, setUser, auth} = useContext(AccountContext); 

    if(user){
        setEstado(true);
    }

    const getUserData = (data) => {
        if(data){
            setEstado(true);
        }
    } 

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