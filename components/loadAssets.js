import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function loadAssets() {
  const [isLoadingComplete, setLoadingComplete] = useState(true);

  // Load any resources or data
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts, assets, or data here
        // await someAsyncTask();
        
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
