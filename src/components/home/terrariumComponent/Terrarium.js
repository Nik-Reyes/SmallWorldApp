import React, { useState, useRef, useEffect } from "react";
import { View, Text, Platform, Alert } from "react-native";
import UnityView from "@azesmway/react-native-unity";///lib/commonjs";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { styles } from "../../../styles/Home.styles";
import Button from "../Button/Button";

const terrariumImage = require("../../../../assets/images/garden.png");

console.log("UnityView:", UnityView);
if (!UnityView) {
  console.warn("UnityView is null");
}

export default function Terrarium() {
  const [isUnityVisible, setUnityVisible] = useState(false);
  const [isUnitySupported, setUnitySupported] = useState(true);
  const unityRef = useRef(null);
  const dynamicContainer = dynamicContainerStyles();

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

  return (
    <View style={dynamicContainer("terrarium")}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Terrarium</Text>
      </View>
      {isUnityVisible ? (
        <View style={{ flex: 1 }}>
            <UnityView
              ref={unityRef}
              style={{ flex: 1 }}
              onUnityMessage={(result) => {
                console.log("Unity Message Received:", result.nativeEvent.message);
              }}
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