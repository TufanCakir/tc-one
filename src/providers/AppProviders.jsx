// src/providers/AppProviders.jsx
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProfileProvider } from "../context/ProfileContext";
// ggf. weitere Provider hier importieren

export default function AppProviders({ children }) {
  return (
    <SafeAreaProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </SafeAreaProvider>
  );
}
