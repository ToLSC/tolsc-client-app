import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

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
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(4),
        fontWeight: "bold",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20
    },

    inputContainerActivated:{
        flex: 1,
        color: 'white',
        fontSize: responsiveFontSize(4.5),
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(1),
        fontWeight: "bold",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },

    micLayout:{
        position: 'absolute',
        bottom: 10,
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        maxWidth: responsiveWidth(18),
        maxHeight: responsiveWidth(18),
        alignSelf: 'center',
        justifyContent: 'center'
    },

    icon:{
        padding: 5,
        color: '#1E1E1E',
        fontSize: 30,
        alignSelf: 'center',
    },

    closeInput:{
        alignItems: 'flex-end',
        height: 'auto',
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 25,
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
    },
})
