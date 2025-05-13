// src/hooks/useUpdateChecker.js
import { useEffect } from "react";
import { Alert } from "react-native";
import * as Updates from "expo-updates";

export default function useUpdateChecker() {
  useEffect(() => {
    if (!__DEV__) {
      (async () => {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            Alert.alert(
              "Update verfügbar",
              "Ein neues Update wurde geladen. Die App wird jetzt neu gestartet.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    Updates.reloadAsync();
                  },
                },
              ],
              { cancelable: false }
            );
          }
        } catch (e) {
          console.log("Fehler beim Prüfen von Updates:", e);
        }
      })();
    }
  }, []);
}
