import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import VideoList from '../../../components/videoListComponent/VideoListComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../../context/ThemeContext';
import { AccountContext } from '../../../context/LoginContext';
import { ref, get } from "firebase/database";

export default function HistoryScreenComponent() {

    const insets = useSafeAreaInsets();

    //Firebase path
    const FB_USERS_PATH = "users/";
    const FB_HISTORY_PATH = "history/";
    const FB_FAVORITES_PATH = "favorites/";

    //Darktheme context
    const {darkThemeEnabled} = useContext(ThemeContext);
    const [isDarkThemeEnabled, changeTheme] = useState(darkThemeEnabled);
    useEffect(() => { changeTheme(darkThemeEnabled) }, [darkThemeEnabled] )

    //User context
    const {user, database} = useContext(AccountContext);   
    const [historial, setHistorial] = useState(undefined);
    const [favoritos, setFavoritos] = useState(undefined);

    //Datos de firebase
    useEffect(() => { 

        get(ref(database, FB_USERS_PATH + user.user.uid + "/" + FB_FAVORITES_PATH)).then(data => {createArray(data, 1)}).catch(error => {console.log(error)}) //Read favorites
        get(ref(database, FB_USERS_PATH + user.user.uid + "/" + FB_HISTORY_PATH)).then(data => {createArray(data, 2)}).catch(error => {console.log(error)}) //Read history

    },[])


    const createArray = (data, operation) => {
        const array = [];

        data.forEach((value) => {
            array.push(value)
        })

        if(operation == 1){
      
            if(array.length !== 0)setFavoritos(array);
            else setFavoritos(undefined);
            
        }else if(operation == 2){
            
            if(array.length !== 0) setHistorial(array);
            else setHistorial(undefined)  

        }
    }


    return (
        <ScrollView vertical={true} nestedScrollEnabled={true} style={[{ flex: 1, paddingTop: insets.top }, isDarkThemeEnabled? {backgroundColor: 'black'} : {backgroundColor: '#F5F4FA'}]}>

            {favoritos? 
                <View style={[{flex: 1}]}>
                    <VideoList section={'Favoritos'} data={favoritos} isDarkThemeEnabled={isDarkThemeEnabled}/>
                </View>: null}

            {historial? 
                <View style={[{flex: 1}]}>
                    <VideoList section={'Historial'} data={historial} isDarkThemeEnabled={isDarkThemeEnabled}/>
                </View>: null}
      
        </ScrollView>
    );
}

