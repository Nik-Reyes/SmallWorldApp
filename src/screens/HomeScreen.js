// React, React Native, & Expo Imports
import { StatusBar } from "expo-status-bar";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Custom Component Imports
import ToolComponent from "../components/home/toolComponent/Tool";
import Terrarium from "../components/home/terrariumComponent/Terrarium";
import Identify from "../components/home/identifyComponent/Identify";
import PlantBanner from "../components/home/PlantBanner/PlantBanner";
import SearchBarComponent from "../components/home/Header/UserHeader";

export default function HomeScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        <LinearGradient
          colors={["#E8F5E9", "#ebf7f4", "#d2ede5"]}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.3, 0.8]}
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />

        <PlantBanner />

        <SearchBarComponent />

        <Terrarium />

        <Identify />

        <ToolComponent />

        <StatusBar hidden={false} style="dark" />
      </View>
    </TouchableWithoutFeedback>
  );
}
