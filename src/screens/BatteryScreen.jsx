import { useBatteryLevel, useBatteryState, BatteryState } from "expo-battery";
import { StyleSheet, Text, View } from "react-native";

export default function BatteryScreen() {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();

  if (batteryLevel == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>🔍 Lade Batterie-Info…</Text>
      </View>
    );
  }

  const percent = Math.floor(batteryLevel * 100);
  const charging = batteryState === BatteryState.CHARGING;

  // Farbe abhängig vom Ladestand
  const batteryColor =
    percent > 50 ? "#4CAF50" : percent > 20 ? "#FFC107" : "#F44336";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔋 Batterie</Text>

      {/* Batterie-Visual */}
      <View style={[styles.batteryOutline, { borderColor: batteryColor }]}>
        <View
          style={[
            styles.batteryFill,
            { width: `${percent}%`, backgroundColor: batteryColor },
          ]}
        />
      </View>

      {/* Prozentsatz */}
      <Text style={styles.percentText}>
        {charging ? "⚡" : ""} {percent}%
      </Text>

      {/* Status-Text */}
      <Text style={styles.statusText}>
        {charging ? "Wird geladen…" : "Nicht am Laden"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  batteryOutline: {
    width: 220,
    height: 40,
    borderWidth: 3,
    borderRadius: 8,
    backgroundColor: "#333",
    overflow: "hidden",
    marginBottom: 15,
  },
  batteryFill: {
    height: "100%",
  },
  percentText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  statusText: {
    fontSize: 18,
    color: "#bbb",
  },
  loading: {
    fontSize: 18,
    color: "#fff",
  },
});
