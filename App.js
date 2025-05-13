import { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import useUpdateChecker from "./src/hooks/useUpdateChecker";
import { enableScreens } from "react-native-screens";
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
    <View style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ProfileHeader />
        <NavigationContainer onStateChange={handleNavigationStateChange}>
          <OnlineGuard>
            <AppNavigator />
          </OnlineGuard>
        </NavigationContainer>

        {/* Navigation-Ladeanzeige */}
        {loading && <LoadingOverlay />}

        {/* Update-Overlay wenn Update geladen wird */}
        {updateVisible && <UpdateOverlay />}
      </SafeAreaView>
    </View>
  );
}

const LoadingOverlay = () => (
  <View style={styles.loadingOverlayBlack}>
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

const UpdateOverlay = () => (
  <View style={styles.updateOverlay}>
    <ActivityIndicator size="large" color="#fff" />
    <Text style={styles.updateText}>Update wird geladen…</Text>
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
