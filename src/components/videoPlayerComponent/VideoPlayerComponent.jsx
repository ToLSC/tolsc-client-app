import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Video } from "expo-av"
import { styles } from "./VideoPlayerComponentStyles";
import { responsiveScreenHeight, responsiveFontSize, responsiveScreenWidth  } from 'react-native-responsive-dimensions';
import { getAnimation } from "../../services/TranslatorService";
import { AccountContext } from "../../context/AccountContext";
import Ionicons from '@expo/vector-icons/Ionicons'
import NotFoundIcon from "../../assets/icons/NotFoundIcon";

export default function VideoPlayerComponent({stringTranslated, comStatus, isDarkThemeEnabled, mainComponent, focused}){

    //Variables
    const video = React.useRef(null);
    const [componentStatus, setComponentStatus] = useState(comStatus);    
    const {addHistoryHandler, addFavoriteHandler, deleteFavoriteHandler, getHistoryData, getFavoriteData, favorites} = useContext(AccountContext);
    const [apiRequestData, setApiRequestData] = useState(undefined);    
    const [isLoading, setLoading] = useState(true);
    const [favorite, setIsFavorite] = useState(false);

    //Api video
    const apiVideoData = async (stringToTranslate) => {
        try {
            const result = await getAnimation(stringToTranslate.toLowerCase());
            setApiRequestData(result.data);
            isFavoriteVideo();
          
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    //Hook - Request video
    useEffect(() => {
        if(componentStatus == true && (stringTranslated != null && stringTranslated != '')){
            setLoading(true);
            setApiRequestData(undefined);
            apiVideoData(stringTranslated);
        }
    }, [stringTranslated])

    //Hook - Request video onChange Component Status
    useEffect(() => {
        if(componentStatus == true && (stringTranslated != null && stringTranslated != '')){
            setApiRequestData(undefined);
            apiVideoData(stringTranslated);
        }
    }, [componentStatus])

    //Is video in favorite list - validation
    const isFavoriteVideo = () => {
        if(favorites){
            favorites.some((value )=> {
                if(value.child("string").val() === stringTranslated) {
                    setIsFavorite(true);
                    return value.child("string").val() === stringTranslated;
                }
            })
        }
    }

    //Refresh data on component focused
    useEffect(() => {
        getFavoriteData();
        if(favorite) isFavoriteVideo();
        else setIsFavorite(false);
    }, [focused])

    //Refresh data on favorites list change
    useEffect(() => { 
        if(favorite) setIsFavorite(false);
        isFavoriteVideo();   
    }, [favorite, stringTranslated, favorites])
    
    //Add video to history
    const addHistory = () => { 
        addHistoryHandler(stringTranslated);
        getHistoryData();
    }

    //Add video to favorites list
    const favoriteHandler = () => {  
        if(!favorite) {
            addFavoriteHandler(stringTranslated);
            setIsFavorite(true);
            getFavoriteData();
        }
        
        else {
            setIsFavorite(false);
            deleteFavoriteHandler(stringTranslated);
            getFavoriteData();
        }
    }

    return(
        <View testID='videoPlayerComponent' style={[styles.container, isDarkThemeEnabled? {backgroundColor: '#181818'} : {backgroundColor: '#FEFEFE'}]}>
            <View style={styles.stringContainer}>
                <Text style={styles.titleStyle}>Texto traducido</Text>
                <Text style={[styles.stringStyle, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>{stringTranslated}</Text>
            </View>
      
            <View style={[{display: 'flex', alignContent: 'center', justifyContent: 'center'}, componentStatus? styles.videoContainer: styles.videoContainerDisable]}>
                  
                {isLoading? 
                    <View>
                        {apiRequestData? 
                            <Video 
                                ref={video}
                                style={styles.video}
                                source={{uri: apiRequestData}}
                                useNativeControls={true}
                                resizeMode="cover"
                                onLoad={() => {if(componentStatus) addHistory()}}          
                            />   
                            :  
                            <ActivityIndicator size="large" color="#39B4C8"/>}
                    </View>

                    : 

                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>
                        <NotFoundIcon width={responsiveScreenWidth(30)} height={responsiveScreenHeight(15)}/>
                        <Text style={styles.videoNotFoundText}>Video no encontrado, prueba buscando otra oración o palabra</Text>
                    </View>
                }      
            </View>  
             
            <View style={styles.bottomContainer}>      
                <View>
                    {apiRequestData || !comStatus? 
                        <TouchableOpacity onPress={favoriteHandler}>
                            <Ionicons name="star-outline" size={responsiveFontSize(3.5)} style={styles.icon} color={favorite? '#FF6666' : '#39B4C8'}/>
                        </TouchableOpacity> 
                    : null}
                </View>        

                {mainComponent? null:
                <TouchableOpacity onPress={() => {setComponentStatus(!componentStatus)}}>
                    <Ionicons name="expand" size={responsiveFontSize(3.5)} style={styles.icon} color={'#39B4C8'}/>
                </TouchableOpacity>}
            </View>
        </View>
    )
}


