import React, { useMemo } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { screens } from "./screens";

const Stack = createNativeStackNavigator();

/** Kleiner Gradient für den Header-Hintergrund */
const GradientHeader = () => (
  <LinearGradient
    colors={["#000000", "#ffffff"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={StyleSheet.absoluteFill}
  />
);

/** Fallback-Screen, wenn keine Screens definiert sind */
function FallbackScreen() {
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>Keine Screens verfügbar 😕</Text>
    </View>
  );
}

/** Hilfsfunktion: "MyCoolScreen" -> "My Cool" */
const toReadableTitle = (name = "") =>
  name
    .replace("Screen", "")
    .replace(/([A-Z])/g, " $1")
    .trim() || "Screen";

function Navigator() {
  // Nur gültige Screens zulassen
  const validScreens = useMemo(() => {
    if (!Array.isArray(screens)) return [];
    return screens.filter((s, idx) => {
      const ok =
        s && typeof s.name === "string" && typeof s.component === "function";
      if (!ok && __DEV__) {
        console.warn(`[Navigator] Ungültiger Screen-Eintrag @${idx}:`, s);
      }
      return ok;
    });
  }, [screens]);

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
      colors={["#000000", "#ffffff"]}
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
