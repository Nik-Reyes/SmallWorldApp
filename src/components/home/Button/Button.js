import React from "react";
import { View, Pressable, Text, ImageBackground } from "react-native";
import { badgeColorList } from "../../../styles/colors";
import { styles } from "../../../styles/Home.styles";

export default function Button({ label, onPress, imgSrc, text }) {
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

  const badgeColor = assignBadgeColor(label);

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
        <ImageBackground
          source={imgSrc}
          style={styles.cameraLibraryImage}
          imageStyle={{
            resizeMode: "stretch",
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <Text style={styles.libraryText}> Select From Library </Text>
        </ImageBackground>
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
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
