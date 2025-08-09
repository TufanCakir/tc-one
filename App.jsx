import { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingOverlay, UpdateOverlay } from "./src/components/Overlays";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppProviders from "./src/providers/AppProviders";
import AppNavigator from "./src/navigation/AppNavigator";
import OnlineGuard from "./src/components/OnlineGuard";
import useUpdateChecker from "./src/hooks/useUpdateChecker";

// --- Konfiguration ---
enableScreens();

const STORAGE_KEYS = {
  APP_START_COUNT: "appStartCount",
  LAST_REVIEW_DATE: "lastReviewDate",
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const loadingTimeoutRef = useRef(null);

  useUpdateChecker(setUpdateVisible);

  // Navigation-Loading Handler
  const handleNavigationStateChange = useCallback(() => {
    clearTimeout(loadingTimeoutRef.current);
    setLoading(true);
    loadingTimeoutRef.current = setTimeout(() => setLoading(false), 500);
  }, []);

  // Bewertungslogik
  const triggerReviewIfEligible = useCallback(async () => {
    try {
      const storedCount = parseInt(
        await AsyncStorage.getItem(STORAGE_KEYS.APP_START_COUNT),
        10
      );
      const count = isNaN(storedCount) ? 1 : storedCount + 1;
      await AsyncStorage.setItem(STORAGE_KEYS.APP_START_COUNT, String(count));

      const lastDate = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_REVIEW_DATE
      );
      const today = new Date().toISOString().split("T")[0];

      if (
        count >= 3 &&
        lastDate !== today &&
        (await StoreReview.isAvailableAsync())
      ) {
        await StoreReview.requestReview();
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_REVIEW_DATE, today);
      }
    } catch (err) {
      console.warn("[Review] Fehler bei der Bewertungsprüfung:", err);
    }
  }, []);

  // App-Start Hook
  useEffect(() => {
    triggerReviewIfEligible();
  }, [triggerReviewIfEligible]);

  // Direkt nach Update bewerten
  useEffect(() => {
    if (updateVisible) {
      (async () => {
        try {
          if (await StoreReview.isAvailableAsync()) {
            await StoreReview.requestReview();
          }
        } catch (err) {
          console.warn("[Review] Fehler beim direkten Update-Review:", err);
        }
      })();
    }
  }, [updateVisible]);

  // Cleanup Timer
  useEffect(() => {
    return () => clearTimeout(loadingTimeoutRef.current);
  }, []);

  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />

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
    backgroundColor: "#000",
  },
});
