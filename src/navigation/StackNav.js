import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Explore from "../screens/Explore.js";
import Learn from "../screens/Learn.js";
import Care from "../screens/Care.js";
import TabNav from "./TabNav.js";
import SignIn from "../screens/SignIn.js";
import Register from "../screens/Register.js"
import ProfileScreen from "../screens/Profile.js";
import Results from "../screens/Results.js";
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNav} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Learn" component={Learn} />
        <Stack.Screen name="Care" component={Care} />
        <Stack.Screen name="Sign-In" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
