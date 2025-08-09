// src/providers/AppProviders.jsx
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { ProfileProvider } from "../context/ProfileContext";
// Weitere Provider hier importieren, z. B. ThemeProvider, AuthProvider etc.

/**
 * AppProviders
 * - Kapselt alle globalen Context-Provider an einem Ort
 * - Sorgt dafür, dass jede Komponente im Tree die Provider nutzen kann
 */
export default function AppProviders({ children }) {
  if (!children) {
    console.error("[AppProviders] Keine children übergeben.");
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ProfileProvider>{children}</ProfileProvider>
    </SafeAreaProvider>
  );
}
