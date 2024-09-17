import React, { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Provider } from "react-redux";
import store from "@/components/redux/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="catalog" options={{ headerShown: false }} />
              <Stack.Screen
                name="details/:id"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="auth/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="auth/confirmation"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="details/other/:id"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="details/search"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile/about"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile/orders"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile/addresses"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile/newaddress"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile/change/:id"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile/payment"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="basket/order"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="basket/details/:id"
                options={{ headerShown: false }}
              />
            </Stack>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
