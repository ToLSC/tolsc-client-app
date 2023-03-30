import React, { useContext, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from "react-native";
import { Styles } from "../styles/LoginScreenComponentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SignIcon from "../../../assets/icons/SignIcon";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { ThemeContext } from "../../../context/ThemeContext";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AccountContext } from '../../../context/LoginContext';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function LoginScreenComponent({ navigation, route }) {
    
  const insets = useSafeAreaInsets();
  const [isDarkThemeEnabled, setisDarkThemeEnabled] = useState((useContext(ThemeContext)).darkThemeEnabled);
  
  const {user, setUser, auth} = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            setUser(user)
            route.params.setUserData(user)
        }).catch((error) => {
            console.log(error)
        });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 

        <View style={[{paddingTop: insets.top, paddingBottom: insets.bottom}, Styles.containerLayout, isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor: '#F5F4FA'}]}>

            <View>
                <Text style={[Styles.title, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Login</Text>
            </View>

            <View style={Styles.iconLayout}>
                <SignIcon width={responsiveWidth(28)} height={responsiveHeight(14)} />
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

            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: responsiveHeight(3.2)}}>
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
            
    </TouchableWithoutFeedback>
  );
}
