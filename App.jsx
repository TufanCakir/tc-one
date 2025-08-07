import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { SafeAreaView } from "react-native-safe-area-context";

import AppProviders from "./src/providers/AppProviders";
import AppNavigator from "./src/navigation/AppNavigator";
import useUpdateChecker from "./src/hooks/useUpdateChecker";
import OnlineGuard from "./src/components/OnlineGuard";

enableScreens();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const loadingTimeoutRef = useRef(null);

  useUpdateChecker(setUpdateVisible);

  const handleNavigationStateChange = () => {
    clearTimeout(loadingTimeoutRef.current);
    setLoading(true);
    loadingTimeoutRef.current = setTimeout(() => setLoading(false), 500);
  };

  useEffect(() => {
    return () => clearTimeout(loadingTimeoutRef.current);
  }, []);

  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <NavigationContainer onStateChange={handleNavigationStateChange}>
          <OnlineGuard>
            <AppNavigator />
          </OnlineGuard>
        </NavigationContainer>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {updateVisible && (
          <View style={styles.updateOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.updateText}>Update wird geladen…</Text>
          </View>
        )}
      </SafeAreaView>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // dein Grundhintergrund
  },
  loadingOverlay: {
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
  updateOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 1000,
  },
  updateText: {
    marginTop: 16,
    fontSize: 16,
    color: "#fff",
  },
});
