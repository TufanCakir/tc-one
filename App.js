import { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import useUpdateChecker from "./src/hooks/useUpdateChecker";
import * as SplashScreen from "expo-splash-screen";
import { enableScreens } from "react-native-screens";
import ProfileHeader from "./src/components/ProfileHeader";

enableScreens();
SplashScreen.preventAutoHideAsync();

export default function App() {
  useUpdateChecker();
  const [loading, setLoading] = useState(false);
  const loadingTimeoutRef = useRef(null);

  const handleNavigationStateChange = () => {
    clearTimeout(loadingTimeoutRef.current);
    setLoading(true);
    loadingTimeoutRef.current = setTimeout(() => setLoading(false), 500);
  };

  useEffect(() => {
    SplashScreen.hideAsync();
    return () => clearTimeout(loadingTimeoutRef.current);
  }, []);

  return (
    <View style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ProfileHeader />
        <NavigationContainer onStateChange={handleNavigationStateChange}>
          <AppNavigator />
        </NavigationContainer>
        {loading && <LoadingOverlay />}
      </SafeAreaView>
    </View>
  );
}

const LoadingOverlay = () => (
  <View style={styles.loadingOverlayBlack}>
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#282c34",
  },
  loadingOverlayBlack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 999,
  },
});
