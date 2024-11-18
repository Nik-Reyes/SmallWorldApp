import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import UnityView from "@azesmway/react-native-unity";
import { dynamicContainerStyles } from "../../../hooks/buttonDimensions";
import { styles } from "../../../styles/Home.styles";
import Button from "../Button/Button";

const terrariumImage = require("../../../../assets/images/garden.png");

export default function Terrarium() {
  const [isUnityVisible, setUnityVisible] = useState(false);
  const unityRef = useRef(null)
  const dynamicContainer = dynamicContainerStyles();

  const terrariumButtonPress = () => {
    setUnityVisible(true);
    console.log("Terrarium Button Pressed");
  }

  return (
    <View style={dynamicContainer("terrarium")}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Terrarium</Text>
      </View>

      {isUnityVisible ? (
        <UnityView
          ref={unityRef}
          style={{ flex: 1 }}
          onUnityMessage={(result) => {
            console.log("Unity Message Recieved:", result.nativeEvent.message);
          }}
        />
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
