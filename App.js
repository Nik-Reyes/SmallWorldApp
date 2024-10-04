import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // This is where we will load the fonts and make any Necessary on-boot
        // API calls. The fonts and API calls are loaded/made AND only then will
        // the setTimeout begin
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Once all on-boot loading is completed, make setAppIsReady to true
        // so that the onLayoutRootView callback can hide the splash screen
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Hide the splash screen
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
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
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.text}>This is your app. Customize away!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#76b947",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
