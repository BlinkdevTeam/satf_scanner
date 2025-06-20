import { StyleSheet, View } from "react-native";
import Main from "./Main";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Monosans: require("./assets/fonts/MonaSans-Regular.ttf"),
    MonosansSemiBold: require("./assets/fonts/MonaSans-SemiBold.ttf"),
    MonosansSemiBoldItalic: require("./assets/fonts/MonaSans-SemiBoldItalic.ttf"),
    // Add more variants if needed
    // MonosansBold: require('./assets/fonts/Monosans-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Main />;
}
