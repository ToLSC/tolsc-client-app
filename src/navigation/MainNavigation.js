import React, { useContext, useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { ThemeProvider } from '../context/ThemeContext';
import { AccountContext, AccountProvider } from '../context/AccountContext';
import LoginNavigation from './LoginNavigation';
import AppNavigation from './AppNavigation';
import { View } from 'react-native';
import SignIcon from "../assets/icons/SignIcon";
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

export default function MainNavigation(){

    //Variables - state
    const [estado, setEstado] = useState(false);
    const {user, setUser, setLoginStatus} = useContext(AccountContext); 
    const [appReady, setAppReady] = useState(false);
    const [multiply, setMultiply] = useState(1);
    
    //Hook - change login status onChange user information
    useEffect(() => { if(user && !estado) setEstado(true) }, [user])
    
    useEffect(() => { 
        setMultiply(1.8)
        transition = async () => {
            try{
                await new Promise((resolve) => { setTimeout(resolve, 2000) })

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
              
            <View style={{backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center',  transform:[{scale:multiply}]}}>                 
                <SignIcon width = {responsiveScreenWidth(40)} height={responsiveScreenHeight(40)}/>
            </View>
        }
        </>
    )
}