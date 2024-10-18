// React, React Native, & Expo Imports
import { useState } from "react";

// Navigation Imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home.js";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import loadAssets from "./components/loadAssets.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const isLoadingComplete = loadAssets();
  const [isSignedIn, setIsSignedIn] = useState(false)

  // 
  if (!isLoadingComplete) {
    return null
  }

  // Has the same effect as the SplashScreen code above without all the
  // error checking and checking whether things like fonts and APIs have
  // loaded before actually loading the app

  // useEffect(() => {
  //   SplashScreen.preventAutoHideAsync();
  //   setTimeout(async () => {
  //     await SplashScreen.hideAsync();
  //   }, 2000);
  // }, []);

  // App View

  // Checking if the user will allow the app to access the camera roll


  

  // App view
  return (
    <NavigationContainer>
      <Stack.Navigator>

      {isSignedIn ? 
        <>
          <Stack.Screen name="Home" component={Home}/>
        </>
        :
        <>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
        </> 
        }

      </Stack.Navigator>
    </NavigationContainer>
      
    
  );
}
