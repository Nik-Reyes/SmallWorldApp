import React from "react";
import { View, Pressable, Text, ImageBackground, Image } from "react-native";
import { badgeColorList } from "../../../styles/colors";
import { styles } from "../../../styles/Home.styles";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";

export default function Button({ label, onPress, imgSrc }) {
  const assignBadgeColor = (label) => {
    switch (label) {
      case "Learn":
        return badgeColorList.Learn;
      case "Explore":
        return badgeColorList.Explore;
      case "Care":
        return badgeColorList.Care;
      case "Terrarium":
        return badgeColorList.Terrarium;
    }
  };

  const assignIcon = (label) => {
    switch (label) {
      case "Learn":
        return (
          <Ionicons
            name="bulb"
            size={23}
            color="#253b35"
            style={{ marginRight: 1 }}
          />
        );
      case "Explore":
        return (
          <FontAwesome
            name="map-marker"
            size={24}
            color="#253b35"
            style={{ marginRight: 4 }}
          />
        );
      case "Care":
        return (
          <FontAwesome6
            name="trowel"
            size={21}
            color="#253b35"
            style={{ marginRight: 4 }}
          />
        );
    }
  };

  const badgeColor = assignBadgeColor(label);
  const iconType = assignIcon(label);

  if (label === "camera") {
    return (
      <Pressable style={styles.identifyButton} onPress={onPress}>
        <View style={styles.cameraButtonContainer}>
          <Text style={styles.cameraText}>Take a pic</Text>
          <Text style={styles.subtitle}> Capture a plant</Text>
        </View>
      </Pressable>
    );
  } else if (label === "library") {
    return (
      <Pressable style={styles.libraryButton} onPress={onPress}>
        <View style={styles.cameraButtonContainer}>
          <Text style={styles.cameraText}>Camera Roll</Text>
          <Text style={styles.subtitle}> Select a photo</Text>
        </View>
      </Pressable>
    );
  } else if (label === "Terrarium") {
    return (
      <Pressable style={styles.terrariumButtonContainer} onPress={onPress}>
        <ImageBackground
          source={imgSrc}
          style={styles.buttonImage}
          imageStyle={{ borderRadius: 30, borderTopLeftRadius: 0 }}
        >
          <View style={[styles.enterBadge, { backgroundColor: badgeColor }]}>
            <Text style={[styles.buttonLabel, styles.imageButtonLabel]}>
              Enter
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    );
  }

  return (
    <View style={styles.shadowContainer}>
      <Pressable style={styles.toolButton} onPress={() => onPress()}>
        {iconType}
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
