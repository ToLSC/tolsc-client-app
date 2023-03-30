import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from './UserProfileScreenComponentStyles';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesing from '@expo/vector-icons/AntDesign'
import { ThemeContext } from '../../../context/ThemeContext';

import { AccountContext } from '../../../context/LoginContext';

export default function UserProfileScreenComponent({change, setUserStatus}) {

    const insets = useSafeAreaInsets();

    const {darkThemeEnabled, setDarkThemeEnabled} = useContext(ThemeContext);
    const [isDarkThemeEnabled, changeTheme] = useState(darkThemeEnabled); 
    const {user, setUser, auth} = useContext(AccountContext);

    useEffect(() => {changeTheme(darkThemeEnabled)}, [darkThemeEnabled]);

    const changeThemeEmiter = () => {
        setDarkThemeEnabled(!darkThemeEnabled);
        change();
    }

    const logoutHandler = () => {
        setUserStatus(false);
    }
 
    return (  
        
        <View style={[isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor: '#F5F4FA'}, {paddingTop: insets.top, flex: 1}]} >
            <ScrollView style={{paddingHorizontal: responsiveWidth(4), paddingTop: responsiveHeight(2)}}>
                 
                <Text style={[Styles.title, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>Settings</Text>
                
                <View style={[Styles.categoryLayout, isDarkThemeEnabled? {backgroundColor: '#181818'} : {backgroundColor: 'white'}]}>
                    <Text style={[Styles.categoryLabel, isDarkThemeEnabled? {color: '#3E3E3E'} : {color: '#898989'}]}>Profile</Text>
                </View>

                <View style={Styles.profileContainer}>
                    <View style={Styles.profileImageContainer}>
                        {user.user.photoURL? <Image source={{uri: user.user.photoURL}} style={Styles.imageProfile} /> : <Image source={{uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}} style={Styles.imageProfile} />}
                    </View>
                    <View style={Styles.profileInfoContainer}>
                        <Text style={[Styles.infoProfile, isDarkThemeEnabled? {color:'white'} : {color:'black'}]}>{user.user.displayName}</Text>
                        <Text style={Styles.infoSecProfile}>{user._tokenResponse.email}</Text>
                        <TouchableOpacity>
                            <Text style={{color: '#39B4C8', paddingTop: responsiveHeight(1.5)}}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[Styles.categoryLayout, isDarkThemeEnabled? {backgroundColor: '#181818'} : {backgroundColor: 'white'}]}>
                    <Text style={[Styles.categoryLabel, isDarkThemeEnabled? {color: '#3E3E3E'} : {color: '#898989'}]}>Content</Text>
                </View>

                <TouchableOpacity>
                    <View style={Styles.buttonContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="heart-outline" size={responsiveWidth(8)} color="#686868" />
                            <Text style={[Styles.buttonText, isDarkThemeEnabled? {color: '#DBDBDB'}: {color: '#505050'}]}>Favorites</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={responsiveWidth(8)} color="#686868" />
                    </View> 
                </TouchableOpacity>

                <View style={[Styles.categoryLayout, isDarkThemeEnabled? {backgroundColor: '#181818'} : {backgroundColor: 'white'}]}>
                    <Text style={[Styles.categoryLabel, isDarkThemeEnabled? {color: '#3E3E3E'} : {color: '#898989'}]}>Preferences</Text>
                </View>

                <TouchableOpacity>
                    <View style={Styles.buttonContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="sunny-outline" size={24} color="#686868" />
                            <Text style={[Styles.buttonText, isDarkThemeEnabled? {color: '#DBDBDB'}: {color: '#505050'}]}>DarkMode</Text>
                        </View>
                        <Switch 
                            value={isDarkThemeEnabled}
                            onValueChange={changeThemeEmiter}
                            thumbColor={'#BFD6DA'}
                            trackColor={{false: "#686868" , true: '#39B4C8'}}         
                        />
                    </View> 
                </TouchableOpacity>

                <TouchableOpacity onPress={logoutHandler}>
                    <View style={[Styles.buttonContainer, {marginBottom: 20}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesing name="logout" size={24} color="#686868" />
                            <Text style={[Styles.buttonText, isDarkThemeEnabled? {color: '#DBDBDB'} : {color: '#505050'}]}>Log out</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={responsiveWidth(8)} color="#686868" />
                    </View> 
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

