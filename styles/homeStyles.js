import { Dimensions, StyleSheet } from "react-native";
 
export const homeStyles = StyleSheet.create({
    backgroundImage: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'absolute'
    },
    container: {
      flex: 1, //grows gorizontally and vertically to fill the free space (entire screen in this case)
      paddingHorizontal : 10,
      paddingVertical: 20,
      width: Dimensions.get('window').width,
    },
    gradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%',
    },
    headerContainer :{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput : {
      flexGrow: 1,
      backgroundColor: '#FFFFF7',
    },
    isFocused : {
      flex: 1
    },
    Avatar : {
      margin: 10
    },
    terrariumContainer: {
      width: '100%',
      marginVertical: 10,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 25,
    },
    terrariumCard: {
      height: 200,
      backgroundColor: "white",
      borderRadius: 0,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 25,
      elevation: 10,
      backgroundColor: "white"
    },
    plantIdentify: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    plantIdentifyCards: {
      flexBasis: '48%',
      height: 150,
      backgroundColor: 'white',
      elevation: 10,
      margin: 5,
      borderRadius: 0,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 25,
    },
    plantIdentifyCardsContent : {
      height: '100%',
      backgroundColor: 'white',
      elevation: 10,
      borderRadius: 0,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 25,
      overflow: 'hidden',
      width: '100%'
    },
    header1 : {
      marginTop: 10,
      fontSize : 24,
      fontWeight: 'bold',
      fontFamily: "serif",
    },
    footerContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    footerCards : {
      flexBasis: '30%',
      height: 150,
      backgroundColor: 'white',
      elevation: 10,
      margin: 5,
      borderRadius: 0,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 25,
    },
    footerCardsContent : {
      height: '100%',
      backgroundColor: 'white',
      elevation: 10,
      borderRadius: 0,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 25,
      overflow: 'hidden',
      width: '100%'
    },
});