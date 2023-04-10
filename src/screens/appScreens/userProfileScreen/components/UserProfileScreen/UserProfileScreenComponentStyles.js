import { StyleSheet } from "react-native";
import { responsiveScreenHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

export const Styles = StyleSheet.create({
    title:{
        fontWeight: 'bold',
        fontSize: responsiveFontSize(4)
    }, 

    categoryLayout:{
        padding: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginBottom: 5
    },

    categoryLabel:{
        color: '#3E3E3E',
        fontSize: responsiveFontSize(2)
    },

    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: responsiveScreenHeight(1.5),
        alignItems: 'center'
    },

    buttonText: {
        fontSize: responsiveFontSize(2.5), 
        paddingLeft: 5
    },

    editProfileButtonText: {
        color: '#39B4C8', 
        paddingTop: responsiveScreenHeight(1.5), 
        fontSize: responsiveFontSize(2), 
        fontWeight: '600'
    },

    profileContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsiveScreenHeight(2)
    },

    imageProfile:{
        backgroundColor: 'red',
        width: 85,
        height: 85,
        borderRadius: 100
    },

    profileInfoContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    infoProfile:{
        color: 'white',
        fontWeight: '600',
        fontSize: responsiveFontSize(3.2)
    },

    infoSecProfile:{
        color: '#808080',
        fontSize: responsiveFontSize(2.5)
    }
})