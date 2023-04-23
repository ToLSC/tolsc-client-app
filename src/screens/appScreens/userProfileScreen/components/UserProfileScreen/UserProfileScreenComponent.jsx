import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from './UserProfileScreenComponentStyles';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { AccountContext } from '../../../../../context/AccountContext';
import ProfileIcon from '../../../../../assets/icons/ProfileIcon';
import Logout from '../../../../../assets/icons/Logout';
import EditProfile from '../../../../../assets/icons/EditProfile';
import NextIcon from '../../../../../assets/icons/Next';


export default function UserProfileScreenComponent({ navigation, route }) {

    //Variables - init
    const insets = useSafeAreaInsets();

    //Variables - Theme context
    const { darkThemeEnabled, setDarkThemeEnabled } = useContext(ThemeContext);
    const [isDarkThemeEnabled, changeTheme] = useState(darkThemeEnabled);
    useEffect(() => { changeTheme(darkThemeEnabled) }, [darkThemeEnabled]);

    //Variables - User context
    const { user, auth } = useContext(AccountContext);

    //Switch between light and dark theme
    const changeThemeEmiter = () => {
        setDarkThemeEnabled(!isDarkThemeEnabled);
        route.params.change(!isDarkThemeEnabled);
    }

    //Logout
    const logoutHandler = () => {
        route.params.setUserStatus(false);
        auth.signOut();
    }

    return (
        <View style={[isDarkThemeEnabled ? { backgroundColor: 'black' } : { backgroundColor: '#F5F4FA' }, { paddingTop: insets.top, flex: 1 }]} >
            <ScrollView style={{ paddingHorizontal: responsiveScreenWidth(4), paddingTop: responsiveScreenHeight(2) }}>

                <Text style={[Styles.title, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>Settings</Text>

                <View style={[Styles.categoryLayout, isDarkThemeEnabled ? { backgroundColor: '#181818' } : { backgroundColor: 'white' }]}>
                    <Text style={[Styles.categoryLabel, isDarkThemeEnabled ? { color: '#3E3E3E' } : { color: '#898989' }]}>Profile</Text>
                </View>

                <View style={Styles.profileContainer}>
                    <View>
                        <ProfileIcon width={responsiveScreenWidth(30)} height={responsiveScreenHeight(15)} />
                    </View>
                    <View style={Styles.profileInfoContainer}>
                        <Text style={[Styles.infoProfile, isDarkThemeEnabled ? { color: 'white' } : { color: 'black' }]}>{user.displayName}</Text>
                        <Text style={Styles.infoSecProfile}>{user.email}</Text>
                    </View>
                </View>

                <View style={[Styles.categoryLayout, isDarkThemeEnabled ? { backgroundColor: '#181818' } : { backgroundColor: 'white' }]}>
                    <Text style={[Styles.categoryLabel, isDarkThemeEnabled ? { color: '#3E3E3E' } : { color: '#898989' }]}>Preferences</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <View style={[Styles.buttonContainer, { marginBottom: 20, paddingRight: 10 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <EditProfile width={25} height={30}/>   
                            <Text style={[Styles.buttonText, isDarkThemeEnabled ? { color: '#DBDBDB' } : { color: '#505050' }]}>Edit profile</Text>
                        </View>
                        <NextIcon width={20} height={20}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={logoutHandler}>
                    <View style={[Styles.buttonContainer, { marginBottom: 20, paddingRight: 10 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>            
                            <Logout width={25} height={30} />              
                            <Text style={[Styles.buttonText, isDarkThemeEnabled ? { color: '#DBDBDB' } : { color: '#505050' }]}>Log out</Text>
                        </View>
                        <NextIcon width={20} height={20}/>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

