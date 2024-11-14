// React, React Native, & Expo Imports
import HomeStack from "./src/navigation/StackNav";
import { useCallback, useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

SplashScreen.preventAutoHideAsync();

const Images = [
  require("./assets/images/TopComponent.png"),
  require("./assets/images/garden.png"),
  require("./assets/images/explore.jpg"),
  require("./assets/images/learn.jpg"),
  require("./assets/images/Care.jpg"),
];

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    Prata: require("./assets/fonts/Prata.otf"),
    Prompt_Light: require("./assets/fonts/Prompt-Light.otf"),
    Prompt_Regular: require("./assets/fonts/Prompt-Regular.otf"),
  });

  // Effect for image preparation
  useEffect(() => {
    async function prepareImages() {
      try {
        console.log("Prepping images...");
        const assetImages = Images.map((image) => {
          if (typeof image === "number") {
            console.log("image", image);
            return Asset.fromModule(image).downloadAsync();
          }
          return Asset.fromURI(image).downloadAsync();
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

  // Effect to hide the splash screen when everything is ready
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && (fontsLoaded || fontsError)) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded, fontsError]);

  if (!appIsReady || (!fontsLoaded && !fontsError)) {
    return null; // Render nothing until ready
  }

  // App view
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <HomeStack />
    </View>
  );
}
