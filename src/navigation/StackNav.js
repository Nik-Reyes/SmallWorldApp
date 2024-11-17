import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Explore from "../screens/Explore.js";
import Learn from "../screens/Learn.js";
import Care from "../screens/Care.js";
import TabNav from "./TabNav.js";
import { AuthContextProvider } from '../context/AuthContext'
import ProtectedScreen from '../components/ProtectedScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import PostsScreen from "../screens/PostsScreen.jsx";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (

    <AuthContextProvider>

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNav} />
        <Stack.Screen name="Explore"  >
        {()=> (
          <ProtectedScreen>
          <Explore/>
        </ProtectedScreen>
      )}
        </Stack.Screen>
        <Stack.Screen name="Learn" component={Learn} />
        <Stack.Screen name="Care" component={Care} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="PostsScreen" >
        {()=> (
          <ProtectedScreen>
          <PostsScreen/>
        </ProtectedScreen>
      )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
      </AuthContextProvider>
  );
}
