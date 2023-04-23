import { StyleSheet } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingBottom: responsiveScreenHeight(1),
        borderRadius: 15,
        paddingHorizontal: responsiveScreenWidth(4),
        paddingTop: responsiveScreenHeight(2),
        marginHorizontal: responsiveScreenWidth(0.5)
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
        marginHorizontal: responsiveScreenWidth(3),     
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
        width: responsiveScreenWidth(80),
        borderRadius: 10,
        minHeight: responsiveScreenHeight(35)
    },

    videoNotFoundText:{
        textAlign: 'center', 
        fontSize: responsiveFontSize(2), 
        fontWeight: '600', 
        paddingHorizontal: responsiveScreenWidth(10), 
        color: '#777777', 
        marginTop: responsiveScreenHeight(2)
    },

    bottomContainer:{
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        verticalAlign: "bottom",
    }, 

    icon: {
        marginRight: 20,
        marginLeft: 10,
        padding: 4
    }
})
