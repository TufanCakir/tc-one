import React, { useMemo } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { screens } from "./screens";

// --- Konfiguration ---
const GRADIENT_COLORS = ["#000000", "#ffffff"];
const Stack = createNativeStackNavigator();

// --- UI: Header-Hintergrund ---
const GradientHeader = () => (
  <LinearGradient
    colors={GRADIENT_COLORS}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={StyleSheet.absoluteFill}
  />
);

// --- UI: Fallback-Screen ---
function FallbackScreen() {
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>Keine Screens verfügbar 😕</Text>
    </View>
  );
}

// --- Utils: Titel aufbereiten ---
const toReadableTitle = (name = "") =>
  name
    .replace(/Screen$/i, "") // "Screen" am Ende entfernen (case-insensitive)
    .replace(/([A-Z])/g, " $1") // CamelCase trennen
    .replace(/^\s/, "") // führendes Leerzeichen entfernen
    .trim() || "Screen";

function Navigator() {
  // Gültige Screens filtern
  const validScreens = useMemo(() => {
    if (!Array.isArray(screens)) return [];
    return screens.filter((s, idx) => {
      const validName = typeof s?.name === "string" && s.name.length > 0;
      const validComp =
        typeof s?.component === "function" ||
        React.isValidElement(s?.component);
      const ok = validName && validComp;
      if (!ok && __DEV__) {
        console.warn(`[Navigator] Ungültiger Screen-Eintrag @${idx}:`, s);
      }
      return ok;
    });
  }, []);

  // Start-Route bestimmen
  const startRoute =
    validScreens.find((s) => s.name === "StartScreen")?.name ??
    validScreens[0]?.name ??
    "Fallback";

  return (
    <Stack.Navigator
      initialRouteName={startRoute}
      screenOptions={{
        headerTransparent: true,
        headerTintColor: "#fff",
        headerTitleStyle: { fontSize: 20, fontWeight: "700" },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "transparent" },
        animation: Platform.OS === "ios" ? "slide_from_right" : "fade",
        headerBackground: GradientHeader,
      }}
    >
      {validScreens.length > 0 ? (
        validScreens.map(({ name, component, title, headerShown = false }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{
              title: title ?? toReadableTitle(name),
              headerShown,
            }}
          />
        ))
      ) : (
        <Stack.Screen
          name="Fallback"
          component={FallbackScreen}
          options={{ headerShown: false, title: "Fallback" }}
        />
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Navigator />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "transparent",
  },
  fallbackText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    opacity: 0.9,
  },
});
