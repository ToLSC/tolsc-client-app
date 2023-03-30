import React from "react";
import { Text, View } from "react-native";
import {styles} from '../videoListComponent/VideoListComponentStyles'
import VideoPlayerComponent from "../videoPlayerComponent/VideoPlayerComponent";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export default function VideoList({section, isDarkThemeEnabled, data}){

    return( 
      <View style={styles.container}> 
        <Text style={[{fontWeight: 'bold', fontSize: responsiveFontSize(4), paddingVertical: responsiveHeight(1.5), paddingLeft: responsiveWidth(2)}, isDarkThemeEnabled? {color: 'white'} : {color: 'black'}]}>{section}</Text>
        {data.map((value) => (<VideoPlayerComponent key={value.key} stringTranslated={value.child("string").val()} comStatus={false} isDarkThemeEnabled={isDarkThemeEnabled}/>))}
      </View>
    )
}