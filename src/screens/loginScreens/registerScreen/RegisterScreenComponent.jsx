import React, { useContext, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from "react-native";
import { Styles } from "../styles/LoginScreenComponentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from "../../../context/ThemeContext";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { AccountContext } from '../../../context/LoginContext';

export default function RegisterScreenComponent( {navigation, route} ){

    const insets = useSafeAreaInsets();
    const [isDarkThemeEnabled, setisDarkThemeEnabled] = useState((useContext(ThemeContext)).darkThemeEnabled);

    const {user, setUser, auth} = useContext(AccountContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleCreateUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setUser(user);

                updateProfile(auth.currentUser, {displayName: name}).then(data => {
                    route.params.setUserData(user)

                }).catch(error => {
                    console.log(error);
                })

            }).catch((error) => {
                console.log(error)
            });
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, Styles.containerLayout, isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor: '#F5F4FA'}]}>

                <View style={Styles.buttonBackLayout} >
                    <TouchableOpacity onPress={() => navigation.navigate('loginScreen')} style={{paddingHorizontal: 5, paddingLeft: 0}}>
                        <Ionicons name="arrow-back" size={35} style={{color: '#ccc'}}/>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={[Styles.title, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Register</Text>
                </View>

                <View>
                    
                    <View style={Styles.inputContainer}>
                        <Text style={[Styles.inputLabel, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Full name</Text>
                        <TextInput
                            style={[Styles.input, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}
                            placeholder="Enter your full name"
                            placeholderTextColor={isDarkThemeEnabled? "#3E3E3E" : '#AFAFAF' }
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>

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
                </View>

                <View style={[Styles.buttonStyle, {marginVertical: 45}]}>
                    <TouchableOpacity onPress={handleCreateUser}>
                        <Text style={Styles.buttonLoginText}>Register</Text>
                    </TouchableOpacity>
                </View>

                <View style={[Styles.createAccountLayout, {marginTop: 0}]}>
                    <Text style={[Styles.createAccountText, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
                        <Text style={Styles.createAccountTexthighlight}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </TouchableWithoutFeedback>
    )
}