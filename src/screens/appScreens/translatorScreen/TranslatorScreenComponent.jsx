import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from './TranslatorScreenComponentStyles';
import { ThemeContext } from '../../../context/ThemeContext';
import { AccountProvider } from '../../../context/AccountContext';
import { useIsFocused } from '@react-navigation/native';
import InputComponent from '../../../components/inputComponent/InputComponent';
import VideoPlayerComponent from '../../../components/videoPlayerComponent/VideoPlayerComponent';

export default function TranslatorScreenComponent() {
    //Variables
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();

    //Variables - state
    const [inputStatus, setInputStatus] = useState(true);
    const [videoStatus, setVideoStatus] = useState(false);
    const [inputData, setInputData] = useState(null); 
    const [requestData, setRequestData] = useState();

    //Varibales- Theme context 
    const { darkThemeEnabled } = useContext(ThemeContext);
    const [isDarkThemeEnabled, changeTheme] = useState(darkThemeEnabled);
    useEffect(() => { changeTheme(darkThemeEnabled) }, [darkThemeEnabled])
    
    //Hook Video
    useEffect(() => { if(inputData != null && inputData != '') setVideoStatus(true) }, [inputData])

    

    //Change input status
    const changeInputStatus = (status) => { 
        setInputStatus(status);
    } 

    //Get input data
    const inputComponentData = (data) => { 
        setInputData(data);
    } 

    return (

        <View style={[{ flex: 1, paddingTop: insets.top}, isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor:'#F3F1F7'}]} >
        
            {videoStatus? 
                <View style={inputStatus? Styles.videoContainerDisable : Styles.videoContainerActivated}>
                    <AccountProvider>
                        <VideoPlayerComponent stringTranslated={inputData.trim()} animation={requestData} comStatus={true} isDarkThemeEnabled={isDarkThemeEnabled} mainComponent={true} focused={isFocused}/>
                    </AccountProvider>
                </View> 
                
                : 
            
                null
            }

            <View style={Styles.inputContainer}>
                <InputComponent videoStatus={videoStatus} changeInputStatus={changeInputStatus} inputData={inputComponentData} isDarkThemeEnabled={isDarkThemeEnabled} />
            </View>

        </View>
    );
}





