import { StyleSheet, Dimensions } from "react-native";

export const signInStyles = StyleSheet.create({
    sav : {
        flex: 1,
    },
    container: {
        flex: 1,
        display: 'flex',
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom:"5%",
        paddingTop: "5%",
    },
    signInOptions : {
        width: '100%',
    },
    hrContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    hr : {
        flex: 1,
        height: 1,
        backgroundColor: 'gray', // Adjust color for the lines
        marginHorizontal: 10, // Space around the text
    },
    form : {
        width: '100%',
        marginTop: 10,
    },
    signInText : {
        textAlign: 'left', 
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 10
    },
    primaryText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    secondaryText : {
        fontSize: 18,
        color: 'gray'
    },
    InputContainer : {
        marginBottom: 10
    },
    textInputIcons: { 
        padding: 10,
    },
    supportTools: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    forgotPassword : {
        display: 'flex',
        
    },
    forgotPasswordText : {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    rememberMe : {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitButton : {
        backgroundColor: '#48AC54',
    },
    footer : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        
    },
})