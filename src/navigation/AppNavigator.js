import { StyleSheet, View, Text } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import { screens } from "./screens";

const Stack = createStackNavigator();

const Navigator = () => {
  const validScreens = Array.isArray(screens)
    ? screens.filter(
        (screen) =>
          screen &&
          typeof screen.name === "string" &&
          typeof screen.component === "function"
      )
    : [];

  if (validScreens.length === 0) {
    console.warn("⚠️ Keine gültigen Screens gefunden. Zeige Fallback-Screen.");
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Fallback"
          component={() => (
            <View style={styles.fallback}>
              <Text style={styles.fallbackText}>
                Keine Screens verfügbar 😕
              </Text>
            </View>
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "dark" },
        headerTintColor: "dark",
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      {validScreens.map(
        ({ name, component, title = "", headerShown = false }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{ title, headerShown }}
          />
        )
      )}
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
        <Navigator />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
