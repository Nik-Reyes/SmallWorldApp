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
    marginBottom: 16,
  },

  titleText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#014421",
  },

  terrariumButtonContainer: {
    flex: 1,
    shadowColor: "#BDBDBD",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    borderRadius: 30,
  },

  toolButtonContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
  },

  toolButton: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "center",
  },

  cameraText: {
    color: "#424242",
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

  libraryButton: {
    width: "48%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    shadowColor: "#BDBDBD",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },

  libraryText: {
    textAlign: "center",
    width: "100%",
    color: "#424242",
    backgroundColor: "white",
  },

  identifyButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  identifyButton: {
    width: "48%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "white",
    shadowColor: "#BDBDBD",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },

  shadowContainer: {
    width: "32%",
    height: "100%",
    shadowColor: "#BDBDBD",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },

  buttonLabel: {
    color: "#424242",
    fontSize: 18,
    fontWeight: "500",
  },

  imageButtonLabel: {
    color: "white",
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

  enterBadge: {
    position: "absolute",
    bottom: -0.2,
    width: "100%",
    height: "30%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
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
    flex: 1,
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
    fontSize: 12,
    fontWeight: "300",
    color: "#616161",
  },

  searchInput: {
    height: 50,
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
