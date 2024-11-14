// React, React Native, & Expo Imports
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Linking, Platform, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as SplashScreen from "expo-splash-screen";
import { fbApp, firebaseUpload, getPhotoUrl } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

// Custom Component Imports
import Button from "../components/Button";
import { list } from "firebase/storage";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [cameraPermission, setCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [libraryPermission, setLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [files, setFiles] = useState([]);

  const navigation = useNavigation()
  
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
    if (result.canceled) {
      return;
    } else {
      //console.log(result.assets[0].uri);
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
      if (photo.canceled == true) {
        return;
      } else {
        const { fileName, uri } = photo.assets[0];
        //console.log("URI: " + photo.assets[0].uri);
        let augmentedFileName = fileName;
        // Create a fileName for assets object if no fileName is created automatically
        augmentedFileName = fileName || uri.split("/").pop();
        //console.log("Generated file name:", augmentedFileName);

        const uploadResponse = await firebaseUpload(uri, augmentedFileName);
        console.log("Upload Response: ", uploadResponse);

        // Photo URL can then be used to get
        const fbPhotoUrl = await getPhotoUrl(augmentedFileName);
        console.log("App.js download url: " + fbPhotoUrl);
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

  // App view
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* Async function to choose a photo from the camera roll */}
      <View style={styles.terrarium}>
        <Button label="Terrarium" type="terrarium" />
      </View>

      <View style={styles.plantIdentify}>
        <Button label="Identify" type="identify" onPress={takePhotoAsync} />
        <Button label="Camera Roll" type="identify" onPress={pickPhotoAsync} />
      </View>

      <View style={styles.plantIdentify}>
        <TouchableOpacity  onPress={()=> navigation.navigate('LoginScreen')}>
            <Text>
                Community
            </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Button label="Explore" />
        <Button label="Learn" />
        <Button label="Care" />
        
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
  },

  plantIdentify: {
    flex: 1 / 3,
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
  },
});
