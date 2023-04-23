import { StyleSheet } from "react-native";
import { responsiveScreenWidth, responsiveFontSize, responsiveScreenHeight } from "react-native-responsive-dimensions";

export const Styles = StyleSheet.create({
    
    keyboardAvoidingLayout:{
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center'
    },

    containerLayout:{
        flex: 1,
        paddingHorizontal: responsiveScreenWidth(5),
        height: responsiveScreenHeight(100)
   
    },
    
    title: {
        fontSize: responsiveFontSize(4.5),
        fontWeight: '500',
        paddingBottom: responsiveScreenHeight (2.5)
    },

    iconLayout:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: responsiveScreenHeight (1)
    },

    inputContainer:{
        paddingVertical: responsiveScreenHeight(1),
    },

    inputLabel: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '300',
        marginBottom: 4
    },

    input:{
        fontSize: responsiveFontSize(2.8),
        fontWeight: '300',
        borderColor: '#272727',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: responsiveScreenHeight(1.5),
        paddingHorizontal: responsiveScreenWidth(3)
    },
    
    forgotPassword:{
        fontSize: responsiveFontSize(2.3),
        fontWeight: '400',
        color: '#3B6CB8',
        alignSelf: 'flex-end',
        marginBottom: responsiveScreenHeight(3.5),
    },

    buttonStyle:{
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        paddingVertical: responsiveScreenHeight(1),
        paddingHorizontal: responsiveScreenWidth(2.5),
        justifyContent: 'center',
        alignItems: 'center'
    },

    googleLayout:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#272727',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: responsiveScreenHeight(1.4),
    },

    buttonGoogleText:{
        fontSize: responsiveFontSize(2.25),
        color: 'white',
        fontWeight: '300',
        paddingLeft: 10
    },

    buttonLoginText:{
        fontSize: responsiveFontSize(2.3),
        color: 'black',
        fontWeight: '500',
        padding: 5 
    },

    createAccountLayout:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: "bottom",
        marginTop: responsiveScreenHeight(1.5)
    },

    createAccountText:{
        color: 'white',
        fontSize: 14
    },

    createAccountTexthighlight:{
        color: '#3B6CB8',
        paddingLeft: 5,
        fontWeight: '700',
        fontSize: 15
    },

    buttonBackLayout:{
        paddingTop: 5, 
        paddingLeft: 0,
        paddingBottom: responsiveScreenHeight(1),
        marginRight: responsiveScreenWidth(78)
    }
})
