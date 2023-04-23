import { StyleSheet } from "react-native"
import { responsiveScreenHeight, responsiveScreenWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({

    containerLayout:{
        flex: 1,
        position: 'relative', 
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },

    inputContainer:{
        flex: 1,
        color: 'white',
        fontSize: responsiveFontSize(4.3),
        paddingHorizontal: responsiveScreenWidth(5),
        paddingTop: responsiveScreenHeight(4),
        fontWeight: "bold",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },

    inputContainerActivated:{
        flex: 1,
        color: 'white',
        fontSize: responsiveFontSize(4.5),
        paddingHorizontal: responsiveScreenWidth(5),
        fontWeight: "bold",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },

    micLayout:{
        position: 'absolute',
        bottom: 10,
        width: responsiveScreenWidth(20),
        height: responsiveScreenWidth(20),
        maxWidth: responsiveScreenWidth(18),
        maxHeight: responsiveScreenWidth(18),
        alignSelf: 'center',
        justifyContent: 'center'
    },

    icon:{
        padding: 5,
        color: '#1E1E1E',
        fontSize: 30,
        alignSelf: 'center',
    },   
    
    inputSubmit:{
        flex: 1,
        alignItems: 'flex-end'
    },

    togglesContainer:{
        display: 'flex', 
        flexDirection: 'row', 
        marginVertical: responsiveScreenHeight(2),
        marginHorizontal: responsiveScreenWidth(5)
    },

    closeInput:{
        flex: 1,
        alignItems: 'flex-start'
    },

    toggleText:{
        color: '#A5A5A5', 
        fontWeight: 'bold', 
        fontSize: responsiveFontSize(2.3)
    },

    micContainerPlay:{
        backgroundColor: '#39B4C8',
        borderRadius: 900,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    micContainerStop:{
        backgroundColor: '#E05B41',
        borderRadius: 900,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
