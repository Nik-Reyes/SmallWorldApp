import { firebaseUpload, getPhotoUrl } from "../services/firebaseConfig";
import { Linking, Alert, Platform } from "react-native";

//Function that opens up the app settings
const openAppSettings = async () => {
  if (Platform.OS == "ios") {
    Linking.openURL("app-settings:");
  } else if (Platform.OS == "android") {
    await Linking.openSettings();
  }
};

export const alertMessage = () => {
  Alert.alert(
    "No access to camera",
    "Access to the camera is needed to take photos",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Settings", onPress: () => openAppSettings() },
    ]
  );
};

export const obtainPhotoUrl = async (img) => {
  const { fileName, uri } = img.assets[0];
  //console.log("URI: " + photo.assets[0].uri);

  // Create a fileName for assets object if no fileName is created automatically
  const uploadName = fileName || uri.split("/").pop();
  //console.log("Generated file name:", uploadName);

  await firebaseUpload(uri, uploadName);
  //console.log("Snapped Photo Upload Response: ", uploadResponse);

  const fbPhotoUrl = await getPhotoUrl(uploadName);
  console.log("url: ", fbPhotoUrl);
  return fbPhotoUrl;
};
