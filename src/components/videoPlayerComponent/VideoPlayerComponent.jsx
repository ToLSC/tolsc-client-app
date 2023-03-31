import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Video } from "expo-av"
import { styles } from "./VideoPlayerComponentStyles";
import Ionicons from '@expo/vector-icons/Ionicons'
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { getAnimation } from "../../services/TranslatorService";
import { AccountContext } from "../../context/LoginContext";
import { ref, push } from "firebase/database";


export default function VideoPlayerComponent({stringTranslated, comStatus, isDarkThemeEnabled}){

    //Firebase path
    const FB_USERS_PATH = "users/";
    const FB_HISTORY_PATH = "history/";
    const FB_FAVORITES_PATH = "favorites/";

    //Variables
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [componentStatus, setComponentStatus] = useState(comStatus);    
    const {user, database} = useContext(AccountContext);
    const [apiRequestData, setApiRequestData] = useState(undefined);    

    //Api video request
    const apiVideoData = async (stringToTranslate) => {

        try {
            const result = await getAnimation(stringToTranslate.toLowerCase());
            setApiRequestData(result.data);
          
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(componentStatus == true && (stringTranslated != null && stringTranslated != '')){
            setApiRequestData(undefined);
            apiVideoData(stringTranslated);
        }
    }, [stringTranslated])


    //Video Request hook
    useEffect(() => {
        if(componentStatus == true && (stringTranslated != null && stringTranslated != '')){
            setApiRequestData(undefined);
            apiVideoData(stringTranslated);
        }
    }, [componentStatus])


    const addFavoriteHandler = () => {
        push(ref(database, FB_USERS_PATH + user.uid + "/" + FB_FAVORITES_PATH), {string: stringTranslated}).then().catch(error => {console.log(error)})
    }

    const addHistoryHandler = () => {
        push(ref(database, FB_USERS_PATH + user.uid + "/" + FB_HISTORY_PATH), {string: stringTranslated}).then(console.log("Guardado con exito")).catch(error => {console.log(error)})
    }

    
    return(
        
        <View style={[styles.container, isDarkThemeEnabled? {backgroundColor: '#181818'} : {backgroundColor: '#FEFEFE'}]}>
            <View style={styles.stringContainer}>
                <Text style={styles.titleStyle}>String</Text>
                <Text style={[styles.stringStyle, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>{stringTranslated}</Text>
            </View>
      
            <View style={[{display: 'flex', alignContent: 'center', justifyContent: 'center'}, componentStatus? styles.videoContainer: styles.videoContainerDisable]}>
                {apiRequestData? 
                    <Video 
                    ref={video}
                    style={styles.video}
                    source={{uri: apiRequestData}}
                    useNativeControls={true}
                    resizeMode="cover"
                    onLoad={() => {if(componentStatus) addHistoryHandler()}}/> 
                    
                    : <Text style={{alignItems: "center", justifyContent: 'center'}}>No se pudo cargar el video</Text>}

            </View>
         
            <View style={styles.bottomContainer}>
                
                <TouchableOpacity onPress={addFavoriteHandler}>
                    <Ionicons name="star-outline" size={responsiveFontSize(3.5)} style={styles.icon} />
                </TouchableOpacity> 

                {componentStatus? null:
                <TouchableOpacity onPress={() => {setComponentStatus(!componentStatus)}}>
                    <Ionicons name="expand" size={responsiveFontSize(3.5)} style={styles.icon} />
                </TouchableOpacity>}
            </View>
        </View>
    )
}


