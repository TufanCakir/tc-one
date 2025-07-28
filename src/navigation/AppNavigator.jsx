// AppNavigator.jsx
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screens } from "./screens";

const Stack = createNativeStackNavigator();

function FallbackScreen() {
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>Keine Screens verfügbar 😕</Text>
    </View>
  );
}

function Navigator() {
  const validScreens = Array.isArray(screens)
    ? screens.filter(
        (screen) =>
          screen &&
          typeof screen.name === "string" &&
          typeof screen.component === "function"
      )
    : [];

  return (
    <Stack.Navigator
      initialRouteName={validScreens.length ? "StartScreen" : "Fallback"}
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
        contentStyle: { backgroundColor: "#000" }, // statt transparent
      }}
    >
      {validScreens.length > 0 ? (
        validScreens.map(({ name, component, title, headerShown }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{
              title:
                title ||
                name
                  .replace("Screen", "")
                  .replace(/([A-Z])/g, " $1")
                  .trim(),
              headerShown: headerShown ?? false,
            }}
          />
        ))
      ) : (
        <Stack.Screen
          name="Fallback"
          component={FallbackScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  fallbackText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
});
