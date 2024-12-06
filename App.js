// // React, React Native, & Expo Imports
// import HomeStack from "./src/navigation/StackNav";
// import { useCallback, useEffect, useState } from "react";
// import { View, SafeAreaView } from "react-native";
// import * as SplashScreen from "expo-splash-screen";
// // import { fbApp, firebaseUpload, getPhotoUrl } from "./firebaseConfig";
// import {
//   fbApp,
//   firebaseUpload,
//   getPhotoUrl,
// } from "./src/services/firebaseConfig.js";
// import { callPlantApi, processImage } from './plant-recognition';
// import * as FileSystem from "expo-file-system"

// // Custom Component Imports
// // import Button from "./src/components/home/Button";
// import { list } from "firebase/storage";
// import { Asset } from "expo-asset";
// import { AuthProvider } from "./src/services/authContext";

// SplashScreen.preventAutoHideAsync();

// const Images = [
//   require("./assets/images/TopComponent.png"),
//   require("./assets/images/garden.png"),
// ];

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepareImages() {
//       try {
//         // console.log("Prepping images...");
//         const assetImages = Images.map((image) => {
//           if (typeof image === "number") {
//             // console.log("image", image);
//             return Asset.fromModule(image).downloadAsync();
//           }
//           return Asset.fromURI(image).downloadAsync();
//         });
//         await Promise.all(assetImages);
//         console.log("All images processed");
//         setAppIsReady(true);
//       } catch (e) {
//         console.warn(e);
//       }
//     }
//     prepareImages();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       try {
//         await SplashScreen.hideAsync();
//       } catch (error) {
//         console.warn("Error hiding splash screen")
//       }
      
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null; // Render nothing until ready
//   }

//   // Checking if the user will allow the app to access the camera roll
//   const pickPhotoAsync = async () => {
//     // Check first if the user has granted permissions, and do not proceed until they have
//     if (libraryPermission?.granted != true) {
//       const { status } = await setLibraryPermission();
//       if (status != "granted") {
//         alertMessage();
//         return;
//       }
//     }
//     // Passed the initial permissions check which means they can choose a photo
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//     });
//     // //Check if the user canceled the image selection process and retrieve an image only if they did not cancel
//     // if (result.canceled) {
//     //   return;
//     // // } else {
//     // //   //console.log(result.assets[0].uri);
//     // // }
//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       const fileName = uri.split("/").pop();
//       const localUri = `${FileSystem.documentDirectory}${fileName}`;
      
//       // Copy file to the document directory
//       await FileSystem.copyAsync({ from: uri, to: localUri });
      
//       const organ = 'flower';
//       await processImage(localUri, organ);
//     }
//   };

//   // Check if the user will allow access to the camera
//   const takePhotoAsync = async () => {
//     try {
//       // Check first if the user has granted permissions, and do not proceed until they have
//       if (cameraPermission?.granted != true) {
//         const { status } = await setCameraPermission();
//         if (status != "granted") {
//           alertMessage();
//           return;
//         }
//       }
//       // Passed the initial permissions check which means they can take a photo
//       const photo = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         quality: 1,
//       });
//       if (photo.canceled == true) {
//         return;
//       } else {
//         // const { fileName, uri } = photo.assets[0];
//         // //console.log("URI: " + photo.assets[0].uri);
//         // let augmentedFileName = fileName;
//         // // Create a fileName for assets object if no fileName is created automatically
//         // augmentedFileName = fileName || uri.split("/").pop();
//         // //console.log("Generated file name:", augmentedFileName);
//         const uri = photo.assets[0].uri;
//         const fileName = uri.split("/").pop();
        
//         // Save to Expo's document directory if necessary
//         const localUri = `${FileSystem.documentDirectory}${fileName}`;
//         await FileSystem.copyAsync({
//           from: uri,
//           to: localUri,
//         });

//         const uploadResponse = await firebaseUpload(localUri, fileName);
//         console.log("Upload Response: ", uploadResponse);

//         /// Get download URL and process image
//         const fbPhotoUrl = await getPhotoUrl(fileName);
//         if (fbPhotoUrl) {
//           const organ = 'flower';
//           await processImage(fbPhotoUrl, organ);
//         } else {
//           console.warn("Failed to retrieve photo URL.");
//         }
//       }

//     } catch (e) {
//       Alert.alert("Error uploading image " + e.message);
//     }
//   };

//   const alertMessage = () => {
//     Alert.alert(
//       "No access to camera",
//       "Access to the camera is needed to take photos",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Settings", onPress: () => openAppSettings() },
//       ]
//     );
//   };

//   //Function that opens up the app settings
//   const openAppSettings = async () => {
//     if (Platform.OS == "ios") {
//       Linking.openURL("app-settings:");
//     } else if (Platform.OS == "android") {
//       await Linking.openSettings();
//     }
//   };

//   // App view
//   return (
//     <AuthProvider>
//       <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//         <HomeStack />
//       </View>
//     </AuthProvider>
//   );
// }

// React, React Native, & Expo Imports
import HomeStack from "./src/navigation/StackNav";
import { useCallback, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Linking, Platform } from "react-native";
import { Asset } from "expo-asset";

// Firebase Imports
import {
  fbApp,
  firebaseUpload,
  getPhotoUrl,
} from "./src/services/firebaseConfig.js";

// PlantNet API Imports
import { callPlantApi, processImage } from "./plant-recognition";

// Auth Context Import
import { AuthProvider } from "./src/services/authContext";

SplashScreen.preventAutoHideAsync();

const Images = [
  require("./assets/images/TopComponent.png"),
  require("./assets/images/garden.png"),
];

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [libraryPermission, setLibraryPermission] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    async function prepareImages() {
      try {
        const assetImages = Images.map((image) => {
          if (typeof image === "number") {
            return Asset.fromModule(image).downloadAsync();
          }
          return Asset.fromURI(image).downloadAsync();
        });
        await Promise.all(assetImages);
        console.log("All images processed");
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepareImages();

    const fetchPermissions = async () => {
      const libraryPerm = await ImagePicker.getMediaLibraryPermissionsAsync();
      const cameraPerm = await ImagePicker.getCameraPermissionsAsync();
      setLibraryPermission(libraryPerm);
      setCameraPermission(cameraPerm);
    };
    fetchPermissions();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn("Error hiding splash screen");
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Render nothing until ready
  }

  const alertMessage = () => {
    Alert.alert(
      "Permission Required",
      "Access to the camera or photo library is needed.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Settings", onPress: openAppSettings },
      ]
    );
  };

  const openAppSettings = async () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else if (Platform.OS === "android") {
      await Linking.openSettings();
    }
  };

  const pickPhotoAsync = async () => {
    if (libraryPermission?.granted !== true) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setLibraryPermission({ granted: status === "granted" });
      if (status !== "granted") {
        alertMessage();
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop();
      const localUri = `${FileSystem.documentDirectory}${fileName}`;

      try {
        await FileSystem.copyAsync({ from: uri, to: localUri });
        const fileInfo = await FileSystem.getInfoAsync(localUri);

        if (!fileInfo.exists) {
          console.error("File copy failed, file not found at:", localUri);
          return;
        }

        const organ = "flower";
        await processImage(localUri, organ);
      } catch (error) {
        console.error("Error processing the image:", error.message);
      }
    }
  };

  const takePhotoAsync = async () => {
    if (cameraPermission?.granted !== true) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission({ granted: status === "granted" });
      if (status !== "granted") {
        alertMessage();
        return;
      }
    }

    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!photo.canceled) {
      const uri = photo.assets[0].uri;
      const fileName = uri.split("/").pop();
      const localUri = `${FileSystem.documentDirectory}${fileName}`;

      try {
        await FileSystem.copyAsync({ from: uri, to: localUri });
        const fileInfo = await FileSystem.getInfoAsync(localUri);

        if (!fileInfo.exists) {
          console.error("File copy failed, file not found at:", localUri);
          return;
        }

        const uploadResponse = await firebaseUpload(localUri, fileName);
        console.log("Upload Response: ", uploadResponse);

        const fbPhotoUrl = await getPhotoUrl(fileName);
        if (fbPhotoUrl) {
          const organ = "flower";
          await processImage(fbPhotoUrl, organ);
        } else {
          console.warn("Failed to retrieve photo URL.");
        }
      } catch (error) {
        console.error("Error processing the photo:", error.message);
      }
    }
  };

  // App view
  return (
    <AuthProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <HomeStack />
      </View>
    </AuthProvider>
  );
}


