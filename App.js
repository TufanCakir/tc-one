// App.js
import React, { useContext, useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import AppProviders from "./src/AppProviders";
import useUpdateChecker from "./src/hooks/useUpdateChecker";
import {
  BackgroundProvider,
  BackgroundContext,
} from "./src/context/BackgroundContext";
import { SummonedBackgroundsProvider } from "./src/context/SummonedBackgroundsContext";
import * as SplashScreen from "expo-splash-screen";

// Verhindere, dass der Splash Screen automatisch ausgeblendet wird
SplashScreen.preventAutoHideAsync();

export default function App() {
  useUpdateChecker();
  const [loading, setLoading] = useState(false);
  const loadingTimeoutRef = useRef(null);

  // Bei jeder Navigationsänderung wird kurzzeitig ein Ladeindikator angezeigt
  const handleNavigationStateChange = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    setLoading(true);
    loadingTimeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Sobald die App gemountet ist, wird der Splash Screen ausgeblendet
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <BackgroundProvider>
      <SummonedBackgroundsProvider>
        <AppProviders>
          <GestureHandlerRootView style={styles.flex}>
            <BackgroundContainer>
              <SafeAreaView style={styles.flex}>
                <View style={styles.contentContainer}>
                  <NavigationContainer
                    onStateChange={handleNavigationStateChange}
                  >
                    <AppNavigator />
                  </NavigationContainer>
                  {loading && <LoadingOverlay />}
                </View>
              </SafeAreaView>
            </BackgroundContainer>
          </GestureHandlerRootView>
        </AppProviders>
      </SummonedBackgroundsProvider>
    </BackgroundProvider>
  );
}

// Hintergrund-Container, der die Hintergrundfarbe aus dem Context nutzt
const BackgroundContainer = ({ children }) => {
  const { backgroundColors } = useContext(BackgroundContext);
  return (
    <View
      style={[
        styles.fullscreen,
        { backgroundColor: backgroundColors?.[0] || "black" },
      ]}
    >
      {children}
    </View>
  );
};

// Ladeindikator, der eine dynamische Hintergrundfarbe und Farbe des Indikators nutzt
const LoadingOverlay = () => {
  const { backgroundColors } = useContext(BackgroundContext);
  const defaultColors = ["black", "blue", "black"];
  const loaderColor = backgroundColors?.[1] || defaultColors[1];

  return (
    <View
      style={[
        styles.loadingOverlay,
        { backgroundColor: backgroundColors?.[0] || defaultColors[0] },
      ]}
    >
      <ActivityIndicator size="large" color={loaderColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // Immer im Vordergrund
  },
});
