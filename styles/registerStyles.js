import { StyleSheet, Dimensions } from "react-native";

export const registerStyles = StyleSheet.create({
    registerText : {
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
    container: {
        flex: 1,
        display: 'flex',
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom:"5%",
        paddingTop: "5%",
    },
    form : {
        width: '100%',
        marginTop: 10,
    },
    InputContainer : {
        marginBottom: 10
    },
    submitButton : {
        backgroundColor: '#48AC54',
        marginVertical: 10
    },
})