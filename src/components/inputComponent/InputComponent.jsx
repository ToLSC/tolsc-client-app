import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Keyboard, Button, Text } from "react-native";
import { styles } from '../inputComponent/InputComponentStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesone from '@expo/vector-icons/FontAwesome';
import { Audio } from "expo-av";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import * as Sharing from 'expo-sharing';

export default function InputComponent( {videoStatus, changeInputStatus, inputData, isDarkThemeEnabled} ){

    const [inputActivated, setInputActivated] = useState(false); 
    const [inputText, setInputText] = useState(''); 

    const keyboardActivated = () => {
        setInputActivated(true);
        changeInputStatus(true);
    }
  
    const keyboardDisable = () => {
        setInputActivated(false); 
        setInputText('');
        Keyboard.dismiss();
        {videoStatus? changeInputStatus(false) : changeInputStatus(true)}  
    }

    const submitInputText = () => {
        inputData(inputText);
        setInputActivated(false);
        changeInputStatus(false);
        Keyboard.dismiss();
    }

    const endEditing = () => {
        setInputText('');
    }

    return(
        <View style={[styles.containerLayout, isDarkThemeEnabled? {backgroundColor: '#181818'} : {backgroundColor: 'white'}]}>

            {inputActivated ? <ToggleCloseInput keyboardToggle={keyboardDisable}/> : null}
      
            <TextInput 
                onFocus={keyboardActivated}
                style = {[inputActivated? styles.inputContainerActivated : styles.inputContainer, isDarkThemeEnabled? {backgroundColor: '#181818', color: 'white'} : {backgroundColor: 'white', color: 'black'}]}
                value = {inputText}
                multiline={true} 
                placeholder="Enter Text"
                textAlignVertical="top"
                placeholderTextColor={isDarkThemeEnabled? "#3E3E3E" : '#AFAFAF' }
                keyboardAppearance = "dark"
                onChangeText={text => setInputText(text)}
                onSubmitEditing={submitInputText}
                onEndEditing={endEditing}
                returnKeyType= "search"
                enablesReturnKeyAutomatically={true}
            />

            <View style={styles.micLayout}>
                <VoiceInput />
            </View>
       
        </View>
    )
}

function ToggleCloseInput({keyboardToggle}){
    return(
        <View style={styles.closeInput}>
            <TouchableOpacity onPress={keyboardToggle}>
                <Ionicons name="close-circle-outline" size={30} style={{color:'#ccc'}} />
            </TouchableOpacity>
        </View>
    )
}

function VoiceInput(){

    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);
    const [message, setMessage] = useState("");

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
      
            if (permission.status === "granted") {

              await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true
              });
              
              const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
              );
      
              setRecording(recording);

            } else {
              setMessage("Please grant permission to app to access microphone");
            }

          } catch (err) {
            console.error('Failed to start recording', err);
            }
    }

    const stopRecording = async () => {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        const uri = recording.getURI();
        console.log('GrabaciÃ³n guardada en: ', uri)

        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        setRecordings(updatedRecordings);
        console.log(recordings)
        Sharing.shareAsync(uri)
    }

    const getDurationFormatted = (millis) => {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    return(
        <View style={recording? styles.micContainerStop : styles.micContainerPlay}>
            <TouchableOpacity onPress={recording? stopRecording : startRecording}> 
                {recording? <FontAwesone name="stop" size={responsiveFontSize(3.5)} color="#181818"/> : <FontAwesone name="microphone" size={responsiveFontSize(4.5)} color="#181818"/>}    
            </TouchableOpacity>
        </View>
    )
}

