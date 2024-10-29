import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function Button({ label, type, onPress, imgSrc }) {
  const assignBadgeColor = (label) => {
    switch (label) {
      case "Learn":
        return "#5C9CB4";
      case "Explore":
        return "#CC7734";
      case "Care":
        return "#CC8890";
      case "terrarium":
        return "#76B947";
      default:
        return "black;";
    }
  };

  const badgeColor = assignBadgeColor(label);

  if (type === "primary") {
    return (
      <View style={[styles.buttonContainer]}>
        <Pressable style={[styles.button]} onPress={onPress}>
          <FontAwesome
            name="picture-o"
            size={18}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  } else if (label === "identify") {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            width: 182.5,
            height: 89.5,
          },
        ]}
      >
        <Pressable style={[styles.button]} onPress={onPress}>
          <Text style={[styles.buttonLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  } else if (label === "terrarium") {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            width: 365,
            height: 193,
          },
        ]}
      >
        <Text>Your Terrarium</Text>
        <Pressable style={[styles.button]} onPress={onPress}>
          <ImageBackground
            source={imgSrc}
            style={styles.buttonImage}
            imageStyle={{ borderRadius: 24, borderTopLeftRadius: 0 }}
          >
            <View style={[styles.enterBadge, { backgroundColor: badgeColor }]}>
              <Text style={[styles.buttonLabel, styles.imageButtonLabel]}>
                Enter
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.buttonContainer]}>
      <Pressable
        style={styles.button}
        onPress={() => {
          onPress?.();
        }}
      >
        {imgSrc ? (
          <ImageBackground
            source={imgSrc}
            style={styles.buttonImage}
            imageStyle={{ borderRadius: 24 }}
          >
            <View style={[styles.buttonBadge, { backgroundColor: badgeColor }]}>
              <Text style={[styles.buttonLabel, styles.imageButtonLabel]}>
                {label}
              </Text>
            </View>
          </ImageBackground>
        ) : (
          <Text style={styles.buttonLabel}>{label}</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 113,
    height: 124,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 10,
  },

  button: {
    borderRadius: 24,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "floralwhite",
    elevation: 5,
  },

  buttonLabel: {
    color: "black",
    fontSize: 16,
  },

  imageButtonLabel: {
    color: "whitesmoke",
    paddingBottom: 5,
  },

  buttonImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    resizeMode: "contain",
    flex: 1,
  },

  buttonBadge: {
    position: "absolute",
    top: 0,
    // need to differentiate "right" between android and ios
    // because android needs "right: -0.05"
    right: 0,
    width: "58%",
    height: "30%",
    borderBottomLeftRadius: 15.85,
    borderBottomRightRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  enterBadge: {
    position: "absolute",
    bottom: -0.2,
    width: "100%",
    height: "22.8%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
});
