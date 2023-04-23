import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../../context/ThemeContext';
import { AccountContext } from '../../../context/AccountContext';
import { responsiveScreenHeight, responsiveFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useIsFocused } from '@react-navigation/native';
import VideoList from '../../../components/videoListComponent/VideoListComponent';
import EmptyIcon from '../../../assets/icons/EmptyIcon';

export default function HistoryScreenComponent() {
    
    //Variables init
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();

    //Variables - user context
    const {favorites, history, getHistoryData, getFavoriteData} = useContext(AccountContext);  
 
    //Darktheme context
    const {darkThemeEnabled} = useContext(ThemeContext);
    const [isDarkThemeEnabled, changeTheme] = useState(darkThemeEnabled);
    useEffect(() => { changeTheme(darkThemeEnabled) }, [darkThemeEnabled] );

    useEffect(() => {
        getHistoryData();
        getFavoriteData();
    }, [isFocused])

    return (
        <View style={[{ flex: 1, paddingTop: insets.top, position: 'relative'}, isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor: '#F5F4FA'}]}>

            {history || favorites?     
                <ScrollView vertical={true} nestedScrollEnabled={true}>
                    {favorites? 
                        <View style={[{flex: 1}]}>
                            <VideoList section={'Favoritos'} data={favorites} isDarkThemeEnabled={isDarkThemeEnabled} isFavorite={true}/>
                        </View>: null}

                    {history? 
                        <View style={[{flex: 1, paddingBottom: responsiveScreenHeight(7)}]}>
                            <VideoList section={'Historial'} data={history} isDarkThemeEnabled={isDarkThemeEnabled} isFavorite={false}/>
                        </View>: null}
                </ScrollView>
                
                : 
                
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>     
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>
                        <EmptyIcon width={responsiveScreenWidth(30)} height={responsiveScreenHeight(15)}/>
                        <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2), fontWeight: '600', paddingHorizontal: responsiveScreenWidth(10), color: '#777777', marginTop: responsiveScreenHeight(2)}}>Historial vacío, prueba buscando una palabra en el traductor</Text>
                    </View>

                  </View>
            }

        </View>
    );
}

