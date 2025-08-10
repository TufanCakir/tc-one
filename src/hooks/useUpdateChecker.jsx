// src/hooks/useUpdateChecker.js
import { useEffect, useRef } from "react";
import * as Updates from "expo-updates";

/**
 * Prüft bei App-Start auf OTA-Updates und führt diese automatisch durch.
 *
 * @param {Function} setUpdateStatus - State Setter für den Update-Status ("idle" | "checking" | "updating" | "error")
 * @param {Object} [options]
 * @param {boolean} [options.autoReload=true] - App nach Update automatisch neu starten?
 * @param {number} [options.reloadDelay=1000] - Verzögerung vor Neustart (ms)
 * @param {boolean} [options.debug=false] - Debug-Logs aktivieren
 * @param {boolean} [options.retryOnFail=false] - Bei Fehler automatisch erneut versuchen?
 * @param {number} [options.retryDelay=3000] - Wartezeit vor erneutem Versuch (ms)
 */
export default function useUpdateChecker(setUpdateStatus, options = {}) {
  const {
    autoReload = true,
    reloadDelay = 1000,
    debug = false,
    retryOnFail = false,
    retryDelay = 3000,
  } = options;

  const mounted = useRef(true);

  useEffect(() => {
    if (__DEV__) {
      debug && console.log("[useUpdateChecker] Dev-Modus → kein Update-Check.");
      return;
    }

    const checkForUpdates = async () => {
      if (!mounted.current) return;
      setUpdateStatus?.("checking");
      debug && console.log("[useUpdateChecker] Prüfe auf Updates...");

      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          debug &&
            console.log("[useUpdateChecker] Update gefunden, lade herunter...");
          setUpdateStatus?.("updating");

          await Updates.fetchUpdateAsync();

          if (autoReload) {
            debug &&
              console.log(`[useUpdateChecker] Neustart in ${reloadDelay}ms...`);
            setTimeout(() => {
              if (mounted.current) Updates.reloadAsync();
            }, reloadDelay);
          }
        } else {
          debug && console.log("[useUpdateChecker] Keine Updates verfügbar.");
          setUpdateStatus?.("idle");
        }
      } catch (error) {
        console.error(
          "[useUpdateChecker] Fehler beim Prüfen von Updates:",
          error
        );
        setUpdateStatus?.("error");

        if (retryOnFail && mounted.current) {
          debug &&
            console.log(
              `[useUpdateChecker] Neuer Versuch in ${retryDelay}ms...`
            );
          setTimeout(checkForUpdates, retryDelay);
        }
      }
    };

    checkForUpdates();

    return () => {
      mounted.current = false;
    };
  }, [
    autoReload,
    reloadDelay,
    retryOnFail,
    retryDelay,
    debug,
    setUpdateStatus,
  ]);
}
