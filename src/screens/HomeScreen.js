// React, React Native, & Expo Imports
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useWindowDimensions, StatusBar, Text } from "react-native";

// Custom Component Imports
import ToolComponent from "../components/home/toolComponent/Tool";
import Terrarium from "../components/home/terrariumComponent/Terrarium";
import Identify from "../components/home/identifyComponent/Identify";
import PlantBanner from "../components/home/PlantBanner/PlantBanner";
import SearchBarComponent from "../components/home/Header/UserHeader";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  return (
    <LinearGradient
      colors={["#E8F5E9", "#ebf7f4", "#d2ede5"]}
      start={{ x: 0.5, y: 0.4 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 0.8]}
      style={{
        flex: 1,
      }}
    >
      <PlantBanner />

      <ScrollView
        contentContainerStyle={{
          width: width,
          paddingTop: 70,
          paddingBottom: 100,
          alignSelf: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 20,
          }}
        >
          <SearchBarComponent />
          <Terrarium />
          <Identify />
          <ToolComponent />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
