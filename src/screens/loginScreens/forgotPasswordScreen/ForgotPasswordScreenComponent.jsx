import React, { useContext, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from "react-native";
import { Styles } from "../styles/LoginScreenComponentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import LockIcon from "../../../assets/icons/LockIcon";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { ThemeContext } from "../../../context/ThemeContext";

export default function ForgotPasswordScreenComponent( {navigation} ){

    const insets = useSafeAreaInsets();
    const [isDarkThemeEnabled, setisDarkThemeEnabled] = useState((useContext(ThemeContext)).darkThemeEnabled);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[{ paddingTop: insets.top }, Styles.containerLayout, isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor: '#F5F4FA'}]}>

                <View style={Styles.buttonBackLayout}>
                    <TouchableOpacity onPress={() => navigation.navigate('loginScreen')} style={{paddingHorizontal: 5, paddingLeft: 0}}>
                        <Ionicons name="arrow-back" size={35} style={{color: '#ccc'}}/>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={[Styles.title, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Forgot Password</Text>
                </View>

                <View style={Styles.iconLayout}>
                    <LockIcon width={responsiveWidth(28)} height={responsiveHeight(14)}/>
                </View>

                <View style={{marginVertical: 25}}>
                    <Text style={[Styles.createAccountText, {fontSize: responsiveFontSize(2.5), textAlign: 'center'}, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Enter the email associeate with your account and we´ll send an email with instructions to reset your password</Text>
                </View>

                <View>
                    <View style={Styles.inputContainer}>
                        <Text style={[Styles.inputLabel, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Email</Text>
                        <TextInput
                            style={[Styles.input, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}
                            placeholder="example@company.com"
                            placeholderTextColor="#3E3E3E"
                        />
                    </View>
                </View>

                <TouchableOpacity>
                    <View style={[Styles.buttonStyle, {marginVertical: 30}]}>          
                        <Text style={Styles.buttonLoginText}>Send Email</Text>            
                    </View>
                </TouchableOpacity>

            </View>

        </TouchableWithoutFeedback>
    )
}