import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Styles } from "../styles/LoginScreenComponentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "../../../context/ThemeContext";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { AccountContext } from '../../../context/AccountContext';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
// import Ionicons from '@expo/vector-icons/Ionicons';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import RegisterIcon from '../../../assets/icons/RegisterIcon';


export default function RegisterScreenComponent({ navigation, route }) {

    //Variables - init
    const insets = useSafeAreaInsets();

    //Variables - Theme context
    const [isDarkThemeEnabled, setisDarkThemeEnabled] = useState((useContext(ThemeContext)).darkThemeEnabled);

    //Variables - User context
    const { auth } = useContext(AccountContext);

    //Variables - state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    //Create user handler
    const handleCreateUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, { displayName: name }).then(data => {
                    navigation.navigate('loginScreen')
                }).catch(error => { console.log(error) })
            }).catch((error) => { console.log(error) });
    }

    return (
        <KeyboardAvoidingView style={Styles.keyboardAvoidingLayout} behavior="height" enabled keyboardVerticalOffset={0}>
            <ScrollView>
                <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, Styles.containerLayout, isDarkThemeEnabled ? { backgroundColor: 'black' } : { backgroundColor: '#F5F4FA' }]}>

                    <View style={Styles.buttonBackLayout} >
                        <TouchableOpacity onPress={() => navigation.navigate('loginScreen')} style={{ paddingHorizontal: 5, paddingLeft: 0 }}>
                            {/* <Ionicons name="arrow-back" size={35} style={{ color: '#ccc' }} /> */}
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={[Styles.title, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Register</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: responsiveScreenHeight(1) }}>
                        <RegisterIcon width={120} height={120} />
                    </View>

                    <View>

                        <View style={Styles.inputContainer}>
                            <Text style={[Styles.inputLabel, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Full name</Text>
                            <TextInput
                                style={[Styles.input, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}
                                placeholder="Enter your full name"
                                placeholderTextColor={isDarkThemeEnabled ? "#3E3E3E" : '#AFAFAF'}
                                value={name}
                                onChangeText={text => setName(text)}
                            />
                        </View>

                        <View style={Styles.inputContainer}>
                            <Text style={[Styles.inputLabel, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Email</Text>
                            <TextInput
                                style={[Styles.input, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}
                                placeholder="example@company.com"
                                placeholderTextColor={isDarkThemeEnabled ? "#3E3E3E" : '#AFAFAF'}
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        </View>

                        <View style={Styles.inputContainer}>
                            <Text style={[Styles.inputLabel, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Password</Text>
                            <TextInput
                                style={[Styles.input, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}
                                placeholder="Your password"
                                placeholderTextColor={isDarkThemeEnabled ? "#3E3E3E" : '#AFAFAF'}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>


                    <TouchableOpacity onPress={handleCreateUser} style={[Styles.buttonStyle, { marginTop: 45, marginBottom: 15 }]}>
                        <Text style={Styles.buttonLoginText}>Register</Text>
                    </TouchableOpacity>


                    <View style={[Styles.createAccountLayout, { marginTop: 0 }]}>
                        <Text style={[Styles.createAccountText, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
                            <Text style={Styles.createAccountTexthighlight}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}