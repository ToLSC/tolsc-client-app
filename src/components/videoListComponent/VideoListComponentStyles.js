import { StyleSheet } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({  
    container:{
        flex:1,
        marginBottom: 0,
        borderRadius: 20,
    },

    tileSection: {
        fontWeight: 'bold', 
        fontSize: responsiveFontSize(4), 
        paddingVertical: responsiveScreenHeight(1.5), 
        paddingLeft: responsiveScreenWidth(2)
    }
})