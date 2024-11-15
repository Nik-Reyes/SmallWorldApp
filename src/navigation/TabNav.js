import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChallengeScreen from "../screens/ChallengeScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MindfulnessScreen from "../screens/MeditateScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          paddingTop: 10,
          borderTopWidth: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "white",

          height: Platform.OS === "android" ? 70 : 80,
        },

        headerShown: false,
        tabBarActiveTintColor: "#197f4d",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Mindfulness"
        component={MindfulnessScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="mother-heart"
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
