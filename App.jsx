// App.jsx
import { useState, useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingOverlay, UpdateOverlay } from "./src/components/Overlays";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

// App structure
import AppProviders from "./src/providers/AppProviders";
import AppNavigator from "./src/navigation/AppNavigator";
import OnlineGuard from "./src/components/OnlineGuard";
import useUpdateChecker from "./src/hooks/useUpdateChecker";

enableScreens();

// AsyncStorage Keys
const STORAGE_KEYS = {
  APP_START_COUNT: "appStartCount",
  LAST_REVIEW_DATE: "lastReviewDate",
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const loadingTimeoutRef = useRef();

  useUpdateChecker(setUpdateVisible);

  const handleNavigationStateChange = () => {
    clearTimeout(loadingTimeoutRef.current);
    setLoading(true);
    loadingTimeoutRef.current = setTimeout(() => setLoading(false), 500);
  };

  // Funktion für Bewertungsaufforderung
  const triggerReviewIfEligible = async () => {
    try {
      // App-Start-Zähler aktualisieren
      const storedCount = await AsyncStorage.getItem(
        STORAGE_KEYS.APP_START_COUNT
      );
      const count = storedCount ? parseInt(storedCount, 10) + 1 : 1;
      await AsyncStorage.setItem(
        STORAGE_KEYS.APP_START_COUNT,
        count.toString()
      );

      // Datum prüfen
      const lastDate = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_REVIEW_DATE
      );
      const today = new Date().toISOString().split("T")[0];

      // Zeige nur bei 3. Start oder später & nur 1× pro Tag
      if (count >= 3 && lastDate !== today) {
        if (await StoreReview.isAvailableAsync()) {
          await StoreReview.requestReview();
          await AsyncStorage.setItem(STORAGE_KEYS.LAST_REVIEW_DATE, today);
        }
      }
    } catch (err) {
      console.warn("Fehler bei der Bewertungsprüfung:", err);
    }
  };

  // Beim App-Start prüfen
  useEffect(() => {
    triggerReviewIfEligible();
  }, []);

  // Optional: Bei UpdateOverlay direkt fragen
  useEffect(() => {
    if (updateVisible) {
      (async () => {
        if (await StoreReview.isAvailableAsync()) {
          await StoreReview.requestReview();
        }
      })();
    }
  }, [updateVisible]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
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
