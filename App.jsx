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

enableScreens();

// --- Konstanten ---
const STORAGE_KEYS = {
  APP_START_COUNT: "appStartCount",
  LAST_REVIEW_DATE: "lastReviewDate",
};
const REVIEW_TRIGGER_COUNT = 3;
const LOADING_DELAY = 500;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const loadingTimeoutRef = useRef(null);

  // Prüft auf Updates
  useUpdateChecker(setUpdateVisible);

  // Navigation-Loading Handler
  const handleNavigationStateChange = useCallback(() => {
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    setLoading(true);
    loadingTimeoutRef.current = setTimeout(
      () => setLoading(false),
      LOADING_DELAY
    );
  }, []);

  // Bewertungslogik (App-Start)
  const triggerReviewIfEligible = useCallback(async () => {
    try {
      const storedCount = parseInt(
        await AsyncStorage.getItem(STORAGE_KEYS.APP_START_COUNT),
        10
      );
      const newCount = isNaN(storedCount) ? 1 : storedCount + 1;

      await AsyncStorage.setItem(
        STORAGE_KEYS.APP_START_COUNT,
        String(newCount)
      );

      const lastReviewDate = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_REVIEW_DATE
      );
      const todayDate = new Date().toISOString().split("T")[0];

      if (
        newCount >= REVIEW_TRIGGER_COUNT &&
        lastReviewDate !== todayDate &&
        (await StoreReview.isAvailableAsync())
      ) {
        await StoreReview.requestReview();
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_REVIEW_DATE, todayDate);
      }
    } catch (err) {
      console.warn("[Review] Fehler bei der Bewertungsprüfung:", err);
    }
  }, []);

  // Direkt nach Update bewerten
  const triggerReviewAfterUpdate = useCallback(async () => {
    try {
      if (await StoreReview.isAvailableAsync()) {
        await StoreReview.requestReview();
      }
    } catch (err) {
      console.warn("[Review] Fehler beim direkten Update-Review:", err);
    }
  }, []);

  // App-Start Hook
  useEffect(() => {
    triggerReviewIfEligible();
  }, [triggerReviewIfEligible]);

  // Nach Update-Check
  useEffect(() => {
    if (updateVisible) {
      triggerReviewAfterUpdate();
    }
  }, [updateVisible, triggerReviewAfterUpdate]);

  // Cleanup Timer
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
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
