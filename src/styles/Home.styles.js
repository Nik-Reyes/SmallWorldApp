import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screenView: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },

  titleContainer: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    marginBottom: 2,
  },

  titleText: {
    fontSize: 24,
    // fontFamily: "Prata",
    fontWeight: "700",
  },

  terrariumButtonContainer: {
    flex: 1,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 10,
  },

  cameraText: {
    // fontFamily: "Prompt_Regular",
    color: "black",
    fontSize: 20,
    fontWeight: "500",
  },

  cameraButtonContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  libraryText: {
    textAlign: "center",
    width: "100%",
    // fontFamily: "Prompt_Light",
    color: "black",
    backgroundColor: "white",
    fontWeight: "bold",
  },

  identifyButtonContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 24,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 10,
  },

  identifyButton: {
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },

  libraryButton: {
    width: "60%",
    height: "100%",
    backgroundColor: "darkolivegreen",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderLeftWidth: 3,
  },

  shadowContainer: {
    width: "32%",
    height: "100%",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 10,
  },

  toolButtonContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
  },

  toolButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    overflow: "hidden",
  },

  toolButtonItems: {
    flex: 1,
    position: "relative",
  },

  toolImageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "71%",
  },

  toolButtonImage: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
  },

  toolButtonBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "30%",
    borderTopLeftRadius: 15.85,
    borderTopRightRadius: 15.85,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonLabel: {
    color: "white",
    fontSize: 14,
    // fontFamily: "Prompt_Light",
    fontWeight: "bold",
  },

  imageButtonLabel: {
    color: "whitesmoke",
  },

  buttonImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    resizeMode: "contain",
    flex: 1,
  },

  cameraLibraryImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  enterBadge: {
    position: "absolute",
    bottom: -0.2,
    width: "100%",
    height: "22.8%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.94,
  },

  image: {
    height: "100%",
    width: "100%",
    opacity: 0.4,
  },

  header: {
    height: 200,
    top: 0,
    position: "absolute",
    width: "100%",
    overflow: "hidden",
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    flex: 1, //grows gorizontally and vertically to fill the free space (entire screen in this case)
    alignItems: "center",
    justifyContent: "center",
  },

  terrarium: {
    paddingTop: 90,
    flex: 1 / 3,
    bottom: 0,
  },

  plantIdentify: {
    flex: 1 / 3,
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
  },

  subtitle: {
    // fontFamily: "Prompt_Light",
    fontSize: 12,
    // paddingRight: 3,
    fontWeight: "300",
  },

  searchInput: {
    height: 40,
    width: "70%",
  },
  headerContainer: {
    width: "93.4%",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -45,
    marginBottom: -10,

    justifyContent: "center",
    // backgroundColor: "red",
  },
});
