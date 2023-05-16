import React, { useContext, useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { ThemeContext, ThemeProvider } from '../context/ThemeContext';
import { AccountContext, AccountProvider } from '../context/AccountContext';
import LoginNavigation from './LoginNavigation';
import AppNavigation from './AppNavigation';
import { View, Text } from 'react-native';
import SignIcon from "../assets/icons/SignIcon";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

export default function MainNavigation(){

    //Variables - state
    const [estado, setEstado] = useState(false);
    const {user, setUser, setLoginStatus} = useContext(AccountContext); 
    const [appReady, setAppReady] = useState(false);
    
    //Hook - change login status onChange user information
    useEffect(() => { if(user && !estado) setEstado(true) }, [user])
    
    useEffect(() => { 
        transition = async () => {
            try{
                await new Promise((resolve) => { setTimeout(resolve, 1000) })
            }
            catch(e){
                console.log(e);
            }
            finally{
                setAppReady(true);
            }
        }
        transition()
    })

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
        <>
        {appReady?      
            <ThemeProvider>
                <NavigationContainer>
                    <AccountProvider>
                        {estado? <AppNavigation setUserStatus={getUserStatus}/> :  <LoginNavigation setUserData={getUserData}/> }
                    </AccountProvider>
                </NavigationContainer>
            </ThemeProvider>
        
            : 
            <ThemeProvider>
                <View style={{flex: 1}}>                 
                    <SplashScreen />
                </View>
            </ThemeProvider>  
        }
        </>
    )
}

function SplashScreen(){

    const {darkThemeEnabled} = useContext(ThemeContext);

    return(
        <View style={{backgroundColor: darkThemeEnabled? '#0E0E0E': 'white', flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
            <SignIcon width = {responsiveScreenWidth(40)} height={responsiveScreenHeight(30)}/>
            <Text style={{fontWeight: '300', color: darkThemeEnabled? '#B0B0B0': '#636363', position: 'absolute', bottom: responsiveScreenHeight(10), fontSize: responsiveScreenFontSize(3)}}>TOLSC</Text>
        </View>
    )
}