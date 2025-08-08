import { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingOverlay, UpdateOverlay } from "./src/components/Overlays";

// App structure
import AppProviders from "./src/providers/AppProviders";
import AppNavigator from "./src/navigation/AppNavigator";
import OnlineGuard from "./src/components/OnlineGuard";
import useUpdateChecker from "./src/hooks/useUpdateChecker";

enableScreens();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const loadingTimeoutRef = useRef();

  // Check for updates
  useUpdateChecker(setUpdateVisible);

  // Show loading briefly on navigation change
  const handleNavigationStateChange = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    setLoading(true);
    loadingTimeoutRef.current = setTimeout(() => setLoading(false), 500);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        />
        {/* Overlays möglichst weit oben für sofortigen Render */}
        {loading && <LoadingOverlay />}
        {updateVisible && <UpdateOverlay />}
        <NavigationContainer onStateChange={handleNavigationStateChange}>
          <OnlineGuard>
            <AppNavigator />
          </OnlineGuard>
        </NavigationContainer>
      </SafeAreaView>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // Dark mode background
  },
});
