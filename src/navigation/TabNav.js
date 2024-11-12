import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChallengeScreen from "../screens/ChallengeScreen";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Challenges" component={ChallengeScreen} />
    </Tab.Navigator>
  );
}
