import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from "@expo-google-fonts/ubuntu";
import * as SplashScreen from "expo-splash-screen";
import { Home } from "./src/screens/Home";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Home />
    </>
  );
}
