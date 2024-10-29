// React, React Native, & Expo Imports
import { useEffect, useState } from "react";

// Navigation Imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import Home from "./screens/home.js";
import GuestHome from "./screens/guestHome.js";
import SignIn from "./screens/SignIn";
import Register from "./screens/Register.js";
import Explore from "./screens/explore.js";
import Learn from "./screens/learn.js";
import Care from "./screens/care.js";
import ForgotPassword from "./screens/forgotPassword.js";
import Profile from "./screens/profile.js";

// Components
import loadAssets from "./components/loadAssets.js";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "./firebaseConfig.js";

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


  // Check if user is loggedIn
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
      if (user) {
        // User is signed In
        setIsSignedIn(true)
        console.log("User is Signed In")
      } else {
        setIsSignedIn(false)
        console.log("User is Signed Out")
      }
    })

    return () => unsubscribe();
    
  }, [])

  // App view
  return (
    <NavigationContainer>
      <Stack.Navigator>

      {isSignedIn ? 
        <>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Explore" component={Explore}/>
          <Stack.Screen name="Learn" component={Learn}/>
          <Stack.Screen name="Care" component={Care}/>
          <Stack.Screen name="Profile" component={Profile}/>
        </>
        :
        <>
          <Stack.Screen name="Home" component={GuestHome}/>
          <Stack.Screen name="SignIn" component={SignIn}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Forgot Password" component={ForgotPassword}/>
        </> 
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}
