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

  // Bewertungsaufforderung: erst nach 3 Starts, dann nur 1× pro Tag
  useEffect(() => {
    const checkReviewTrigger = async () => {
      try {
        // App-Start-Zähler
        const storedCount = await AsyncStorage.getItem("appStartCount");
        const count = storedCount ? parseInt(storedCount, 10) + 1 : 1;
        await AsyncStorage.setItem("appStartCount", count.toString());

        // Datum prüfen
        const lastDate = await AsyncStorage.getItem("lastReviewDate");
        const today = new Date().toISOString().split("T")[0];

        if (count >= 3 && lastDate !== today) {
          const available = await StoreReview.isAvailableAsync();
          if (available) {
            await StoreReview.requestReview();
            await AsyncStorage.setItem("lastReviewDate", today);
          }
        }
      } catch (err) {
        console.warn("Fehler bei der Bewertungsprüfung:", err);
      }
    };

    checkReviewTrigger();
  }, []);

  // Optional: zusätzlich bei UpdateOverlay triggern
  useEffect(() => {
    if (updateVisible) {
      (async () => {
        const available = await StoreReview.isAvailableAsync();
        if (available) {
          await StoreReview.requestReview();
        }
      })();
    }
  }, [updateVisible]);

  useEffect(() => {
    return () => clearTimeout(loadingTimeoutRef.current);
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
