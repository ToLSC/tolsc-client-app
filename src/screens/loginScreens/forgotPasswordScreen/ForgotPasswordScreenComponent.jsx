import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Styles } from "../styles/LoginScreenComponentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { ThemeContext } from "../../../context/ThemeContext";
import { AccountContext } from '../../../context/AccountContext';
import { sendPasswordResetEmail } from 'firebase/auth'
import Ionicons from '@expo/vector-icons/Ionicons';
import LockIcon from "../../../assets/icons/LockIcon";
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

export default function ForgotPasswordScreenComponent({ navigation }) {

    //Variables - init
    const insets = useSafeAreaInsets();

    //Variables - Theme context
    const [isDarkThemeEnabled, setisDarkThemeEnabled] = useState((useContext(ThemeContext)).darkThemeEnabled);
    const [email, setEmail] = useState('');

    //Variables - User context
    const { auth } = useContext(AccountContext);

    //Reset password handler
    resetPasswordHandler = () => {
        sendPasswordResetEmail(auth, email).then(navigation.navigate('loginScreen')).catch(e => console.log(e))
    }

    return (
        <KeyboardAvoidingView style={Styles.keyboardAvoidingLayout} behavior="height" enabled keyboardVerticalOffset={0}>
            <ScrollView>
                <View style={[{ paddingTop: insets.top }, Styles.containerLayout, isDarkThemeEnabled ? { backgroundColor: 'black' } : { backgroundColor: '#F5F4FA' }]}>

                    <View style={Styles.buttonBackLayout}>
                        <TouchableOpacity onPress={() => navigation.navigate('loginScreen')} style={{ paddingHorizontal: 5, paddingLeft: 0 }}>
                            <Ionicons name="arrow-back" size={35} style={{color: '#ccc'}}/>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={[Styles.title, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Forgot Password</Text>
                    </View>

                    <View style={Styles.iconLayout}>
                        <LockIcon width={responsiveScreenWidth(28)} height={responsiveScreenHeight(14)} />
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <Text style={[Styles.createAccountText, { fontSize: responsiveFontSize(2.5), textAlign: 'center' }, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Enter the email associeate with your account and we´ll send an email with instructions to reset your password</Text>
                    </View>

                    <View>
                        <View style={Styles.inputContainer}>
                            <Text style={[Styles.inputLabel, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Email</Text>
                            <TextInput
                                testID='emailInput'
                                style={[Styles.input, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}
                                placeholder="example@company.com"
                                placeholderTextColor={isDarkThemeEnabled ? "#3E3E3E" : '#AFAFAF'}
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                    </View>

                    <TouchableOpacity testID='forgotPassButton' onPress={resetPasswordHandler}>
                        <View style={[Styles.buttonStyle, { marginVertical: 30 }]}>
                            <Text style={Styles.buttonLoginText}>Send Email</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}