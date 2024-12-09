import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import Explore from "../screens/Explore.js";
import Learn from "../screens/Learn.js";
import Care from "../screens/Care.js";
import TabNav from "./TabNav.js";
import SignIn from "../screens/SignIn.js";
import Register from "../screens/Register.js";
import ProfileScreen from "../screens/Profile.js";
import CaptureImage from "../screens/CaptureScreen.js";

const Stack = createStackNavigator();

const LeftHeader = ({ navigation }) => {
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        marginLeft: 16,
      }}
    >
      <Feather name="x" size={32} color="white" />
    </Pressable>
  );
};

const RightHeader = ({ onFlashToggle, flashState }) => {
  return (
    <Pressable onPress={onFlashToggle} style={{ marginRight: 16 }}>
      <MaterialCommunityIcons
        name={flashState ? "lightbulb-on" : "lightbulb-off"}
        size={32}
        color={"white"}
      />
    </Pressable>
  );
};

export default function HomeStack() {
  const [flashState, setFlashState] = useState(false);

  const handleFlashClick = () => {
    setFlashState((previousState) => !previousState);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTransparent: true,
          headerTitle: "",
          //Stack navigator contains "navigation" inside properties object
          //Passes prop object and then spreads them out so that "LeftHeader"
          //Can use "navigation"
          headerLeft: () => <LeftHeader navigation={navigation} />,
          headerRight: () => (
            <RightHeader
              flashState={flashState}
              onFlashToggle={handleFlashClick}
            />
          ),
        })}
      >
        <Stack.Screen
          name="Main"
          component={TabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Learn" component={Learn} />
        <Stack.Screen name="Care" component={Care} />
        <Stack.Screen name="Sign-In" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Capture"
          component={CaptureImage}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
