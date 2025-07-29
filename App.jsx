import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import useUpdateChecker from "./src/hooks/useUpdateChecker";
import ProfileHeader from "./src/components/ProfileHeader";
import OnlineGuard from "./src/components/OnlineGuard";
import SafeAreaWrapper from "./src/components/SafeAreaWrapper";

enableScreens();

function AppContent({ loading, updateVisible, onStateChange }) {
  const { theme } = useTheme();

  return (
    <SafeAreaWrapper edges={["left", "right", "top"]}>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.background}
      />
      <ProfileHeader />
      <NavigationContainer onStateChange={onStateChange}>
        <OnlineGuard>
          <AppNavigator />
        </OnlineGuard>
      </NavigationContainer>

      {loading && (
        <View
          style={[styles.loadingOverlay, { backgroundColor: theme.background }]}
        >
          <ActivityIndicator size="large" color={theme.text} />
        </View>
      )}

      {updateVisible && (
        <View style={styles.updateOverlay}>
          <ActivityIndicator size="large" color={theme.text} />
          <Text style={[styles.updateText, { color: theme.text }]}>
            Update wird geladen…
          </Text>
        </View>
      )}
    </SafeAreaWrapper>
  );
}

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
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent
          loading={loading}
          updateVisible={updateVisible}
          onStateChange={handleNavigationStateChange}
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
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
  },
});
