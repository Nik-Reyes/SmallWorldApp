// React, React Native, & Expo Imports
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Linking,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as SplashScreen from "expo-splash-screen";
import { firebaseUpload, getPhotoUrl } from "./firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Custom Component Imports
import Button from "./components/Button";

const plantImage = require("./assets/TopComponent.png");
const exploreImage = require("./assets/explore.jpg");
const learnImage = require("./assets/learn.jpg");
const careImage = require("./assets/Care.jpg");
const terrariumImage = require("./assets/garden.png");

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [cameraPermission, setCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [libraryPermission, setLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        // This is where we will load any fonts and make any Necessary on-boot
        // API calls. The fonts and API calls are loaded/made AND only then will
        // the setTimeout begin
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Once all "on-app-boot" loading is completed, change setAppIsReady to true
        // so that the onLayoutRootView callback can hide the splash screen
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  // Hide the splash screen
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // Checking if the user will allow the app to access the camera roll
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
    if (!result.canceled) {
      const libraryPhoto = await obtainPhotoUrl(result);
      console.log("Library Photo URL: " + libraryPhoto);
    } else {
      return;
    }
  };

  // Check if the user will allow access to the camera
  const takePhotoAsync = async () => {
    try {
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
      if (!photo.canceled == true) {
        const snappedPhoto = await obtainPhotoUrl(photo);
        console.log("Snapped Photo URL: " + snappedPhoto);
      } else {
        return;
      }
    } catch (e) {
      Alert.alert("Error uploading image " + e.message);
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

  const obtainPhotoUrl = async (img) => {
    const { fileName, uri } = img.assets[0];
    //console.log("URI: " + photo.assets[0].uri);
    let augmentedFileName = fileName;
    // Create a fileName for assets object if no fileName is created automatically
    augmentedFileName = fileName || uri.split("/").pop();
    //console.log("Generated file name:", augmentedFileName);

    const uploadResponse = await firebaseUpload(uri, augmentedFileName);
    //console.log("Snapped Photo Upload Response: ", uploadResponse);

    const fbPhotoUrl = await getPhotoUrl(augmentedFileName);
    return fbPhotoUrl;
  };

  // App view
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <LinearGradient
        colors={["#e0f0e3", "whitesmoke", "#e0f0e3"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0, y: 0 }}
        locations={[0.01, 0.4, 0.8]}
        style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
      ></LinearGradient>

      <ImageBackground source={plantImage} style={styles.image}>
        <LinearGradient
          colors={[
            "rgba(224,240,227, 1)",
            "rgba(224,240,227, 0.5)",
            "rgba(224,240,227, 0)",
          ]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.imageOverlay}
        />
      </ImageBackground>

      {/* Async function to choose a photo from the camera roll */}
      <View style={styles.terrarium}>
        <Button
          label="terrarium"
          imgSrc={terrariumImage}
          onPress={() => console.log("Terrarium Button Pressed")}
        />
      </View>

      <View style={styles.plantIdentify}>
        <Button label="identify" onPress={takePhotoAsync} />
        <Button label="identify" onPress={pickPhotoAsync} />
      </View>

      <View style={styles.footerContainer}>
        <Button
          label="Explore"
          imgSrc={exploreImage}
          onPress={() => console.log("Explore Button Pressed")}
        />
        <Button
          label="Learn"
          imgSrc={learnImage}
          onPress={() => console.log("Learn Button Pressed")}
        />
        <Button
          label="Care"
          imgSrc={careImage}
          onPress={() => console.log("Care Button Pressed")}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

//Styles
const styles = StyleSheet.create({
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
    gap: 7,
  },

  plantIdentify: {
    flex: 1 / 3,
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
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
});
