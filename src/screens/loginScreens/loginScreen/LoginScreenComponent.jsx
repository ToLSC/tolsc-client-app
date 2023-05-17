import React, { useContext, useState } from 'react';
import { View,Text,TextInput,TouchableOpacity, ScrollView } from "react-native";
import { Styles } from "../styles/LoginScreenComponentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { ThemeContext } from "../../../context/ThemeContext";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AccountContext } from '../../../context/AccountContext';
import { LogBox } from 'react-native';
import SignIcon from "../../../assets/icons/SignIcon";
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function LoginScreenComponent({ navigation, route }) {

    //Variables - init
    const insets = useSafeAreaInsets();

    //Variables - Theme context
    const [isDarkThemeEnabled, setisDarkThemeEnabled] = useState((useContext(ThemeContext)).darkThemeEnabled);

    //Variables - User context
    const { auth, setLoginStatus } = useContext(AccountContext);

    //Variables - state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Login handler
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then((user) => { setLoginStatus(true) }).catch((error) => {
            switch(error.code) {          
                case 'auth/invalid-email':
                    alert('Correo invalido, por favor vuelve a intentarlo')
                    setEmail('')
                    setPassword('')
                    break;
                
                case 'auth/user-not-found':
                    alert('Usuario no encontrado, por favor vuelve a intentarlo')
                    setEmail('')
                    setPassword('')
                    break;
                
                case 'auth/wrong-password':
                    alert('Contraseña incorrecta, por favor vuelve a intentarlo')
                    setEmail('')
                    setPassword('')
                    break;
        }});
    }

    return (
        <View testID='loginScreen' style={[{ paddingTop: insets.top }, Styles.containerLayout, isDarkThemeEnabled ? { backgroundColor: 'black' } : { backgroundColor: '#F5F4FA' }]}>
            <KeyboardAvoidingView style={Styles.keyboardAvoidingLayout} behavior="height" enabled keyboardVerticalOffset={0}>
                <ScrollView>
                    <View>
                        <View>
                            <Text style={[Styles.title, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Iniciar Sesión</Text>
                        </View>

                        <View style={Styles.iconLayout}>
                            <SignIcon width={responsiveScreenWidth(35)} height={responsiveScreenHeight(18)} />
                        </View>

                        <View>
                            <View style={Styles.inputContainer}>
                                <Text style={[Styles.inputLabel, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Correo</Text>
                                <TextInput
                                    testID='emailInput'
                                    style={[Styles.input, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}
                                    placeholder="example@company.com"
                                    placeholderTextColor={isDarkThemeEnabled ? "#3E3E3E" : '#AFAFAF'}
                                    value={email}
                                    keyboardAppearance = {isDarkThemeEnabled? "dark" : 'ligth'}
                                    onChangeText={text => setEmail(text)}
                                />
                            </View>

                            <View style={Styles.inputContainer}>
                                <Text style={[Styles.inputLabel, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Contraseña</Text>
                                <TextInput
                                    testID='passwordInput'
                                    style={[Styles.input, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}
                                    placeholder="Ingresa tu contraseña"
                                    placeholderTextColor={isDarkThemeEnabled ? "#3E3E3E" : '#AFAFAF'}
                                    keyboardAppearance = {isDarkThemeEnabled? "dark" : 'ligth'}
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    secureTextEntry={true}
                                />
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('forgotPasswordScreen')} style={{display: 'flex', flexDirection: 'column', width: responsiveScreenWidth(70), alignSelf: 'flex-end'}}>
                                <View>
                                    <Text style={Styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity testID='loginButton' onPress={() => handleLogin()}>
                            <View style={Styles.buttonStyle}>
                                <Text style={Styles.buttonLoginText}>Ingresar</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={Styles.createAccountLayout}>
                            <Text style={[Styles.createAccountText, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>¿No estas registrado?</Text>
                            <TouchableOpacity testID='toRegisterButton' onPress={() => navigation.navigate('registerScreen')}>
                                <Text style={Styles.createAccountTexthighlight}>Crear cuenta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
