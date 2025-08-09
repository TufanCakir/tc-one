// src/hooks/useUpdateChecker.js
import { useEffect } from "react";
import * as Updates from "expo-updates";

/**
 * Prüft bei App-Start auf OTA-Updates und führt diese automatisch durch.
 * Optional: Zeigt über `setUpdateUIVisible` ein Lade-Overlay an.
 *
 * @param {Function} setUpdateUIVisible - State Setter für das Update-Overlay (boolean)
 * @param {Object} [options] - Zusätzliche Einstellungen
 * @param {boolean} [options.autoReload=true] - Soll die App nach Update automatisch neu starten?
 * @param {number} [options.reloadDelay=1000] - Verzögerung vor dem Neustart in ms
 */
export default function useUpdateChecker(setUpdateUIVisible, options = {}) {
  const { autoReload = true, reloadDelay = 1000 } = options;

  useEffect(() => {
    if (__DEV__) {
      // Keine Update-Prüfung im Entwicklermodus
      return;
    }

    let isMounted = true;

    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          if (isMounted) setUpdateUIVisible?.(true);

          await Updates.fetchUpdateAsync();

          if (autoReload) {
            setTimeout(() => {
              Updates.reloadAsync();
            }, reloadDelay);
          }
        }
      } catch (error) {
        console.error(
          "[useUpdateChecker] Fehler beim Prüfen von Updates:",
          error
        );
        if (isMounted) setUpdateUIVisible?.(false);
      }
    };

    checkForUpdates();

    return () => {
      isMounted = false;
    };
  }, [setUpdateUIVisible, autoReload, reloadDelay]);
}
