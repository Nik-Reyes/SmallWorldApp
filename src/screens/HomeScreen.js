// React, React Native, & Expo Imports
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Custom Component Imports
import ToolComponent from "../components/home/toolComponent/Tool";
import Terrarium from "../components/home/terrariumComponent/Terrarium";
import Identify from "../components/home/identifyComponent/Identify";
import PlantBanner from "../components/home/PlantBanner/PlantBanner";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
      }}
    >
      <LinearGradient
        colors={["#f0fdf1", "whitesmoke", "#f0fdf2"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0, y: 0 }}
        locations={[0.01, 0.4, 0.8]}
        style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
      />

      <PlantBanner />

      <Terrarium />

      <Identify />

      <ToolComponent />
      <StatusBar />
    </View>
  );
}
