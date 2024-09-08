import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {  
  const [fontsLoaded] = useFonts({
    'overpass': require('../assets/fonts/Overpass-VariableFont_wght.ttf'),
    'overpass-bold': require('../assets/fonts/Overpass-Bold.ttf'),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    } else {
      console.error('Fonts are not loaded');
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack >
      <Stack.Screen name="index" options={{headerShown:false}} />
    </Stack>
  );
}
