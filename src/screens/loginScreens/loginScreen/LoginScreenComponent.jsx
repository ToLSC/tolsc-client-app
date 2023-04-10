import React, { useContext, useState } from 'react';
import { View,Text,TextInput,TouchableOpacity, ScrollView } from "react-native";
import { Styles } from "../styles/LoginScreenComponentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { ThemeContext } from "../../../context/ThemeContext";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AccountContext } from '../../../context/LoginContext';
import { LogBox } from 'react-native';
import SignIcon from "../../../assets/icons/SignIcon";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function LoginScreenComponent({ navigation, route }) {

    //Variables - init
    const insets = useSafeAreaInsets();

    //Variables - Theme context
    const [isDarkThemeEnabled, setisDarkThemeEnabled] = useState((useContext(ThemeContext)).darkThemeEnabled);

    //Variables - User context
    const {auth, setLoginStatus} = useContext(AccountContext);

    //Variables - state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Login handler
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then((user) => { setLoginStatus(true) }).catch((error) => { console.log(error) });
    }

    return (
        <KeyboardAvoidingView style={Styles.keyboardAvoidingLayout} behavior="height" enabled keyboardVerticalOffset={0}>
            <ScrollView>

            <View style={[{paddingTop: insets.top, paddingBottom: insets.bottom}, Styles.containerLayout, isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor: '#F5F4FA'}]}>

                <View>
                    <Text style={[Styles.title, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Login</Text>
                </View>

                <View style={Styles.iconLayout}>
                    <SignIcon width={responsiveScreenWidth(28)} height={responsiveScreenHeight(14)} />
                </View>

                <View>
                    <View style={Styles.inputContainer}>
                        <Text style={[Styles.inputLabel, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Email</Text>
                        <TextInput
                            style={[Styles.input, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}
                            placeholder="example@company.com"
                            placeholderTextColor={isDarkThemeEnabled? "#3E3E3E" : '#AFAFAF' }
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>

                    <View style={Styles.inputContainer}>
                        <Text style={[Styles.inputLabel, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Password</Text>
                        <TextInput
                            style={[Styles.input, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}
                            placeholder="Your password"
                            placeholderTextColor={isDarkThemeEnabled? "#3E3E3E" : '#AFAFAF' }
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('forgotPasswordScreen')}>
                        <Text style={Styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => handleLogin()}>
                    <View style={Styles.buttonStyle}>      
                        <Text style={Styles.buttonLoginText}>Login</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: responsiveScreenHeight(3.2)}}>
                    <View style={{ flex: 1, height: 1, backgroundColor: "#4F4F50" }} />

                    <View>
                        <Text style={{ width: 50, textAlign: "center", color: "#4F4F50" }}>Or</Text>
                    </View>

                    <View style={{ flex: 1, height: 1, backgroundColor: "#4F4F50" }} />
                </View>

                <TouchableOpacity>
                    <View style={Styles.googleLayout}>
                        <GoogleIcon width={30} height={30} />
                        <Text style={[Styles.buttonGoogleText, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Continue with Google</Text>
                    </View>
                </TouchableOpacity>

                <View style={Styles.createAccountLayout}>
                    <Text style={[Styles.createAccountText, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Not a member?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('registerScreen')}>
                        <Text style={Styles.createAccountTexthighlight}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
                
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
