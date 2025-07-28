import { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import AppNavigator from "./src/navigation/AppNavigator";
import useUpdateChecker from "./src/hooks/useUpdateChecker";
import ProfileHeader from "./src/components/ProfileHeader";
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
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <NavigationContainer onStateChange={handleNavigationStateChange}>
        <OnlineGuard>
          <AppNavigator />
        </OnlineGuard>
      </NavigationContainer>

      {/* Navigation-Ladeanzeige */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Update-Overlay */}
      {updateVisible && (
        <View style={styles.updateOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.updateText}>Update wird geladen…</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
