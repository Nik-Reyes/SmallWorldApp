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
