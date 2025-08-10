import { useBatteryLevel, useBatteryState, BatteryState } from "expo-battery";
import { StyleSheet, Text, View, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function BatteryScreen() {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();

  const animWidth = useRef(new Animated.Value(0)).current;

  if (batteryLevel == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>🔍 Lade Batterie-Info…</Text>
      </View>
    );
  }

  const percent = Math.floor(batteryLevel * 100);
  const charging = batteryState === BatteryState.CHARGING;

  const batteryColor =
    percent > 50 ? "#4CAF50" : percent > 20 ? "#FFC107" : "#F44336";

  // Animation bei Änderung des Ladestands
  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: percent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔋 Batterie</Text>

      {/* Batterie */}
      <View style={[styles.batteryContainer, { borderColor: batteryColor }]}>
        <Animated.View
          style={[
            styles.batteryFill,
            {
              width: animWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: batteryColor,
            },
          ]}
        />
        {/* Batterie-Kopf */}
        <View style={[styles.batteryCap, { backgroundColor: batteryColor }]} />
      </View>

      {/* Prozentanzeige */}
      <Text style={styles.percentText}>
        {charging ? "⚡" : ""} {percent}%
      </Text>

      {/* Status */}
      <Text
        style={[styles.statusText, { color: charging ? "#4CAF50" : "#bbb" }]}
      >
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
    marginBottom: 25,
    fontWeight: "bold",
  },
  batteryContainer: {
    width: 220,
    height: 50,
    borderWidth: 3,
    borderRadius: 8,
    backgroundColor: "#333",
    overflow: "hidden",
    flexDirection: "row",
    position: "relative",
    marginBottom: 15,
  },
  batteryCap: {
    position: "absolute",
    right: -10,
    top: 10,
    width: 10,
    height: 30,
    borderRadius: 2,
  },
  batteryFill: {
    height: "100%",
  },
  percentText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  statusText: {
    fontSize: 18,
  },
  loading: {
    fontSize: 18,
    color: "#fff",
  },
});
