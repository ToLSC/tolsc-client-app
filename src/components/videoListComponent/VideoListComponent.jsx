import React from "react";
import { Text, View } from "react-native";
import {styles} from '../videoListComponent/VideoListComponentStyles'
import VideoPlayerComponent from "../videoPlayerComponent/VideoPlayerComponent";

export default function VideoList({section, isDarkThemeEnabled, data}){
    return( 
      <View style={styles.container}> 
        <Text style={[styles.tileSection, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>{section}</Text>
        {data.map((value) => (<VideoPlayerComponent key={value.key} stringTranslated={value.child("string").val()} comStatus={false} isDarkThemeEnabled={isDarkThemeEnabled} mainComponent={false}/>))}
      </View>
    )
}