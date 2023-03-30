import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from './TranslatorScreenComponentStyles';
import InputComponent from '../../../components/inputComponent/InputComponent';
import VideoPlayerComponent from '../../../components/videoPlayerComponent/VideoPlayerComponent';
import { ThemeContext } from '../../../context/ThemeContext';
import { AccountProvider } from '../../../context/LoginContext';

export default function TranslatorScreenComponent() {

    //Variables
    const insets = useSafeAreaInsets();
    const [inputStatus, setInputStatus] = useState(true);
    const [videoStatus, setVideoStatus] = useState(false);
    const [inputData, setInputData] = useState(null); 
    const [requestData, setRequestData] = useState();
    const {darkThemeEnabled} = useContext(ThemeContext);
    const [isDarkThemeEnabled, changeTheme] = useState(darkThemeEnabled);

    //Hook Darktheme
    useEffect(() => {
        changeTheme(darkThemeEnabled);
    }, [darkThemeEnabled])
    
    //Hook Video
    useEffect(() => {
        if(inputData != null && inputData != '') setVideoStatus(true);
    }, [inputData])


    const changeInputStatus = (status) => { 
        setInputStatus(status);
    } 

    const inputComponentData = (data) => { 
        setInputData(data);
    } 

    return (

        <View style={[{ flex: 1, paddingTop: insets.top}, isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor:'#F3F1F7'}]} >
        
            {videoStatus? (   

            <View style={inputStatus? Styles.videoContainerDisable : Styles.videoContainerActivated}>
                <AccountProvider>
                    <VideoPlayerComponent stringTranslated={inputData} animation={requestData} comStatus={true} isDarkThemeEnabled={isDarkThemeEnabled}/>
                </AccountProvider>
            </View> ) : null}

            <View style={Styles.inputContainer}>
                <InputComponent videoStatus={videoStatus} changeInputStatus={changeInputStatus} inputData={inputComponentData} isDarkThemeEnabled={isDarkThemeEnabled}  />
            </View>

        </View>
    );
}





