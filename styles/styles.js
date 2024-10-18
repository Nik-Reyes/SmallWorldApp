import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
      flex: 1, //grows gorizontally and vertically to fill the free space (entire screen in this case)
      backgroundColor: "#FFFFFA",
      alignItems: "center",
      justifyContent: "center",
    },
  
    terrarium: {
      paddingTop: 90,
      flex: 1 / 3,
      bottom: 0,
    },
  
    footerContainer: {
      flex: 1 / 5,
      alignItems: "center",
      bottom: 14,
      flexDirection: "row",
    },
  
    plantIdentify: {
      flex: 1 / 3,
      alignItems: "center",
      bottom: 0,
      flexDirection: "row",
    },
  });