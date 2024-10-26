import { StyleSheet, View, Text, Alert, Pressable, SafeAreaView, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button, Card, TextInput } from "react-native-paper"

// Assets
import leaves from "../assets/leaves_bg.jpeg"

// Styles
import { homeStyles } from "../styles/homeStyles";

// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import ButtonComponent from "../components/ButtonComponent";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {

  const [appIsReady, setAppIsReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = 
    ImagePicker.useCameraPermissions();
  const [libraryPermission, setLibraryPermission] = 
    ImagePicker.useMediaLibraryPermissions();

  const [bgGradient, setBgGradient] = useState('rgba(255, 255, 255, 1)')
  const [searchInput, setSearchInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)

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
    <SafeAreaView>
      <ImageBackground source={leaves} style={homeStyles.backgroundImage}>
        <View style={homeStyles.container}>
          <LinearGradient style={homeStyles.gradient}
            colors={['transparent', bgGradient, bgGradient]}
          />

          {/* Async function to choose a photo from the camera roll */}
          <View style={homeStyles.headerContainer}>
            <TextInput 
              style={[homeStyles.textInput, isFocused && homeStyles.isFocused]}
              mode="flat"
              label="Find a Plant"
              value={searchInput}
              onChangeText={searchInput => setSearchInput(searchInput)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {!isFocused &&
              <Pressable onPress={() => alert('Profile Page not yet implemented')}>
                <Avatar.Image 
                  size={40} 
                  source={require('../assets/default-profile.jpg')}
                  style={[homeStyles.Avatar, isFocused && homeStyles.hideAvatar]}
                  
                />
              </Pressable>
            }
          </View>

          <Text style={homeStyles.header1}>Your Terrarium</Text>
          <Card style={homeStyles.terrariumContainer}>
            <Card.Content style={homeStyles.terrariumCard}>
              
            </Card.Content>
          </Card>
          
          

          <View style={homeStyles.plantIdentify}>

            <Card style={homeStyles.plantIdentifyCards}>
              <Card.Content style={homeStyles.plantIdentifyCardsContent}>
                <Text>Identify</Text>
              </Card.Content>
            </Card>

            <Card style={homeStyles.plantIdentifyCards} onPress={pickPhotoAsync}>
              <Card.Content style={homeStyles.plantIdentifyCardsContent}>
                <Text>CameraRoll</Text>
              </Card.Content>
            </Card>

            {/*<ButtonComponent label="Identify" type="identify" onPress={takePhotoAsync} />*/}
            {/*<ButtonComponent label="Camera Roll" type="identify" onPress={pickPhotoAsync} />*/}
          </View>

          <View>
            <Text>asd</Text>
          </View>


        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
    );
}
