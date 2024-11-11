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
    fontFamily: "Prata",
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
    fontFamily: "Prompt_Regular",
    color: "black",
    fontSize: 20,
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
    fontFamily: "Prompt_light",
    color: "black",
    backgroundColor: "white",
  },

  toolButtonContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
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

  toolButton: {
    width: "32%",
    height: "100%",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 10,
  },

  buttonLabel: {
    color: "white",
    fontSize: 16,
    fontFamily: "Prompt_Light",
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

  buttonBadge: {
    position: "absolute",
    top: 0,
    // need to differentiate "right" between android and ios
    // because android needs "right: -0.05"
    right: 0,
    width: "58%",
    height: "30%",
    borderBottomLeftRadius: 15.85,
    borderBottomRightRadius: 0,
    alignItems: "center",
    justifyContent: "center",
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
    opacity: 0.9,
  },

  image: {
    height: 200,
    top: -20,
    position: "absolute",
    width: "100%",
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0)",
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
    fontFamily: "Prompt_Light",
    fontSize: 12,
    paddingRight: 3,
  },
});
