import React, { useState, useRef, useEffect } from "react";
import { View, Text, Platform, Alert } from "react-native";
import UnityView from "@azesmway/react-native-unity";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { styles } from "../../../styles/Home.styles";
import Button from "../Button/Button";

const terrariumImage = require("../../../../assets/images/garden.png");

export default function Terrarium() {
  const [isUnityVisible, setUnityVisible] = useState(false);
  const [isUnitySupported, setUnitySupported] = useState(true);
  const unityRef = useRef(null);
  const dynamicContainer = dynamicContainerStyles();

  useEffect(() => {
    // Check Unity View support
    if (Platform.OS === 'android' && !UnityView) {
      setUnitySupported(false);
      Alert.alert(
        "Unity Integration Error",
        "Unity View is not properly configured in this project."
      );
    }
  }, []);

  const terrariumButtonPress = () => {
    if (!isUnitySupported) {
      Alert.alert(
        "Unsupported Feature",
        "Unity integration is not available on this device."
      );
      return;
    }
    setUnityVisible(true);
    console.log("Terrarium Button Pressed");
  };

  const handleCloseUnity = () => {
    setUnityVisible(false);
  };

  if (!isUnitySupported) {
    return (
      <View style={dynamicContainer("terrarium")}>
        <Text>Unity integration is not supported on this device.</Text>
      </View>
    );
  }

  return (
    <View style={dynamicContainer("terrarium")}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Terrarium</Text>
      </View>

      {isUnityVisible ? (
        <View style={{ flex: 1 }}>
          {Platform.OS === 'android' && UnityView ? (
            <UnityView
              ref={unityRef}
              style={{ flex: 1 }}
              onUnityMessage={(result) => {
                console.log("Unity Message Received:", result.nativeEvent.message);
              }}
            />
          ) : (
            <Text>Unity View is not available</Text>
          )}
          <Button 
            label="Close Terrarium" 
            onPress={handleCloseUnity} 
          />
        </View>
      ) : (
        <View style={styles.terrariumButtonContainer}>
          <Button
            label="Terrarium"
            onPress={terrariumButtonPress}
            text="button"
            imgSrc={terrariumImage}
          />
        </View>
      )}
    </View>
  );
}