import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({

    inputContainer:{
        flex: 1,
        overflow: 'hidden'
    }, 

    videoContainerActivated:{
        flex: 2.8,
        display: 'flex'
    },

    videoContainerDisable:{
        flex: 0,
        display: 'none',
        backgroundColor: '#181818'
    }
})