<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import PostsScreen from './screens/PostsScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedScreen from './components/ProtectedScreen'


const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <AuthContextProvider>
   <SafeAreaProvider>
<NavigationContainer>
<Stack.Navigator initialRouteName='HomeScreen'>
  <Stack.Screen
    name = 'HomeScreen'
    component={HomeScreen}
    options={{headerShown: false}}
  />
  <Stack.Screen
    name = 'LoginScreen'
    component={LoginScreen}
    options={{headerShown: false}}
    />
  <Stack.Screen
    name = 'RegisterScreen'
    component={RegisterScreen}
    options={{headerShown: false}}
    />
  <Stack.Screen
    name = 'PostsScreen'
    options={{headerShown: false}}
    >
      {()=> (
        <ProtectedScreen>
          <PostsScreen/>
        </ProtectedScreen>
      )}
    </Stack.Screen>
</Stack.Navigator>
</NavigationContainer>
   </SafeAreaProvider>
    </AuthContextProvider>
  )
}

export default App

const styles = StyleSheet.create({})
=======
// React, React Native, & Expo Imports
import HomeStack from "./src/navigation/StackNav";
import { useCallback, useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

SplashScreen.preventAutoHideAsync();

const Images = [
  require("./assets/images/TopComponent.png"),
  require("./assets/images/garden.png"),
];

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepareImages() {
      try {
        console.log("Prepping images...");
        const assetImages = Images.map((image) => {
          if (typeof image === "number") {
            console.log("image", image);
            return Asset?.fromModule(image)?.downloadAsync();
          }
          return Asset?.fromURI(image)?.downloadAsync();
        });
        await Promise.all(assetImages);
        console.log("All images processed");
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepareImages();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Render nothing until ready
  }

  // App view
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <HomeStack />
    </View>
  );
}
>>>>>>> main
