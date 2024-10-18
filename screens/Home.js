import { StyleSheet, View, Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import { useState, useEffect, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { homeStyles } from "../styles/styles";

export default function Home() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = 
    ImagePicker.useCameraPermissions();
  const [libraryPermission, setLibraryPermission] = 
    ImagePicker.useMediaLibraryPermissions();

  const pickPhotoAsync = async () => {
  // Check first if the user has granted permissions, and do not proceed until they have
    if (libraryPermission?.granted != true) {
      const { status } = await setLibraryPermission();
      if (status != "granted") {
        alertMessage();
        return;
      }
    }

    // Passed the initial permissions check which means they can choose a photo
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    //Check if the user canceled the image selection process and retrieve an image only if they did not cancel
    if (result.canceled) {
      return;
    } else {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Check if the user will allow access to the camera
  const takePhotoAsync = async () => {
    // Check first if the user has granted permissions, and do not proceed until they have
    if (cameraPermission?.granted != true) {
      const { status } = await setCameraPermission();
      if (status != "granted") {
        alertMessage();
        return;
      }
    }

    // Passed the initial permissions check which means they can take a photo
    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (photo.canceled == true) {
      return;
    } else {
      setSelectedImage(photo.assets[0].uri);
    }

  };

  const alertMessage = () => {
    Alert.alert(
      "No access to camera",
      "Access to the camera is needed to take photos",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Settings", onPress: () => openAppSettings() },
      ]
    );
  };

  //Function that opens up the app settings
  const openAppSettings = async () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else if (Platform.OS == "android") {
      await Linking.openSettings();
    }
  };

  return (
    <View style={homeStyles.container}>
      {/* Async function to choose a photo from the camera roll */}
      <View style={homeStyles.terrarium}>
          <Button label="Terrarium" type="terrarium" />
      </View>

      <View style={homeStyles.plantIdentify}>
          <Button label="Identify" type="identify" onPress={takePhotoAsync} />
          <Button label="Camera Roll" type="identify" onPress={pickPhotoAsync} />
      </View>

      <View style={homeStyles.footerContainer}>
          <Button label="Explore" />
          <Button label="Learn" />
          <Button label="Care" />
      </View>

      <StatusBar style="auto" />
    </View>
    );
}
