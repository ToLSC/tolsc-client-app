import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Keyboard, Text, ActivityIndicator } from "react-native";
import { styles } from '../inputComponent/InputComponentStyles';
import { Audio } from "expo-av";
import { responsiveFontSize} from "react-native-responsive-dimensions";
import FontAwesone from '@expo/vector-icons/FontAwesome';
import { speechTotext } from "../../services/TranslatorService";

export default function InputComponent( {videoStatus, changeInputStatus, inputData, isDarkThemeEnabled} ){

    //Variables - state
    const [inputActivated, setInputActivated] = useState(false); 
    const [inputText, setInputText] = useState(''); 
    const [isLoading, setLoading] = useState(false);
    const [isMicActivated, setMicActivated] = useState(false);
    
    //OnFocus keyboard activated
    const keyboardActivated = () => {
        setInputActivated(true);
        changeInputStatus(true);
    }
  
    //OnKeyboard disabled
    const keyboardDisable = () => {
        setInputActivated(false); 
        setInputText('');
        Keyboard.dismiss();
        {videoStatus? changeInputStatus(false) : changeInputStatus(true)}  
    }

    //OnSubmit Input
    const submitInputText = () => {
        if(inputText !== ''){
            inputData(inputText);
            setInputActivated(false);
            changeInputStatus(false);
        }

        else{
            alert("Debe ingresar un texto para poder traducirlo");
            setInputActivated(false);
        }
            
        Keyboard.dismiss();
    }

    //OnEndEditing input
    const endEditing = () => {
        setInputText('');
    }

    //OnEnterKeyHandler
    const enterHandler = (e) => {
        if(e.nativeEvent.key == "Enter") submitInputText();
    }


    //SpeechToTextVariables and Functions
    const setIsLoading = (data) => { setLoading(data) }
    const setIsMicActivated = (data) => { setMicActivated(data) }
    useEffect(() => { if(isMicActivated) setInputText('') }, [isMicActivated])

    const getTextFromMic = async (data) => {
        const textData = await data;
        if(textData){
            const stringData = textData.toString();
            const newStringData = stringData.substring(1);
            setInputText(newStringData);
            setLoading(false);
        }   
        else{
            alert("Error en la solicitud, por favor intente mas tarde")
            setInputText('');
            setLoading(false);
        }  
    } 

    return(
        <View style={[styles.containerLayout, isDarkThemeEnabled? {backgroundColor: '#181818'} : {backgroundColor: 'white'}]}>

            {!isLoading? 
                <>
                    {inputActivated ? <TogglesInput keyboardToggle={keyboardDisable} submitInput={submitInputText} currentText={inputText}/>  : null}

                    <TextInput 
                        onFocus={keyboardActivated}
                        style = {[inputActivated? styles.inputContainerActivated : styles.inputContainer, isDarkThemeEnabled? {backgroundColor: '#181818', color: 'white'} : {backgroundColor: 'white', color: 'black'}]}
                        value = {inputText}
                        placeholder={isMicActivated? "Escuchando...": "Enter Text" }         
                        textAlignVertical="top"
                        multiline
                        placeholderTextColor={isDarkThemeEnabled? "#3E3E3E" : '#8B8B8B'}
                        keyboardAppearance = {isDarkThemeEnabled? "dark" : 'ligth'}
                        onChangeText={text => setInputText(text)}
                        onEndEditing={endEditing}
                        returnKeyType= "send"
                        onKeyPress={enterHandler}
                        />  

                        {inputActivated?     
                
                            null : 
                                    
                            <View style={styles.micLayout}> 
                                <VoiceInput setLoading={setIsLoading} sentText={getTextFromMic} setMicActivated={setIsMicActivated}/> 
                            </View>
                        } 
                        
                    </>
                
                : 
                    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="white"/>
                        <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2.5), color: 'white', paddingTop: 5}}>Procesando tu voz...</Text>
                    </View>      
                }

        </View>
    )
}

function TogglesInput({keyboardToggle, submitInput, currentText}){
    //Variables - state
    const [validInput, setValidInput] = useState(false);

    //Hook - input validation
    useEffect(() => {
        if(currentText !== '') setValidInput(true);
        else setValidInput(false);     
    }, [currentText])

    return(
        <View style={styles.togglesContainer}>
            <View style={styles.closeInput}>
                <TouchableOpacity onPress={keyboardToggle}>
                    <Text style={styles.toggleText}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputSubmit}>
                <TouchableOpacity onPress={submitInput} disabled={!validInput}>
                    <Text style={[styles.toggleText, validInput? {color: '#007DF0'} : {color: '#A5A5A5'}]}>Translate</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function VoiceInput({setLoading, sentText, setMicActivated}){
    //Variables - state
    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);
    const [message, setMessage] = useState("");

    //OnStartRecording
    const startRecording = async () => {
        setMicActivated(true);
        try {
            const permission = await Audio.requestPermissionsAsync();
      
            if (permission.status === "granted") {
              await Audio.setAudioModeAsync({allowsRecordingIOS: true,playsInSilentModeIOS: true}); 
              const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
              setRecording(recording);

            } else 
                setMessage("Please grant permission to app to access microphone");
        
        } catch (err) {
            console.error('Failed to start recording', err)
        }
    }

    //OnStopRecording
    const stopRecording = async () => {
        setMicActivated(false);
        setLoading(true);
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({sound: sound,duration: getDurationFormatted(status.durationMillis),file: recording.getURI()});
        setRecordings(updatedRecordings);
        const data = await speechTotext(uri);
        setLoading(true);    

        if(data){
            sentText(data.data);
        }
    }

    //GetDuration
    const getDurationFormatted = (millis) => {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

        return `${minutesDisplay}:${secondsDisplay}`;
    }

    return(
        <View style={recording? styles.micContainerStop : styles.micContainerPlay}>
            <TouchableOpacity onPress={recording? stopRecording : startRecording} style={{paddingHorizontal: 15, paddingVertical: 10}}> 
                {recording? <FontAwesone name="stop" size={responsiveFontSize(3.5)} color="#181818"/> : <FontAwesone name="microphone" size={responsiveFontSize(4.5)} color="#181818"/>}    
            </TouchableOpacity>
        </View>
    )
}

