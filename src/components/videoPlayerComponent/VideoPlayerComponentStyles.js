import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingBottom: responsiveHeight(1),
        borderRadius: 15,
        paddingHorizontal: responsiveWidth(4),
        paddingTop: responsiveHeight(2),
        marginHorizontal: responsiveWidth(0.5)
    }, 

    stringContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.2,
        marginBottom: 0,
        overflow: 'hidden',
        verticalAlign: "top",
        marginHorizontal: responsiveWidth(3),     
    },

    stringStyle:{
        fontSize: responsiveFontSize(3.5),
        fontWeight: 'bold',
        color: 'white',
    },

    titleStyle:{
        fontSize: responsiveFontSize(1.8),
        fontWeight: '300',
        color: '#39B4C8',
    },

    videoContainer:{     
        flex: 5.5,
        marginVertical: 5,
        alignItems: 'center',
        verticalAlign: "middle",
    },

    videoContainerDisable:{
        display: 'none'
    },

    video:{
        flex: 1,
        width: responsiveWidth(80),
        borderRadius: 10,
        minHeight: responsiveHeight(35)
    },

    bottomContainer:{
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        verticalAlign: "bottom",
    }, 

    icon: {
        color: '#39B4C8',
        marginRight: 20,
        marginLeft: 10,
        padding: 4
    }
})
