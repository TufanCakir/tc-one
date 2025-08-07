import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Battery from "expo-battery";

export default function BatteryScreen() {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [charging, setCharging] = useState(null);

  useEffect(() => {
    // Aktuellen Batteriestatus holen
    const getBatteryInfo = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
      const state = await Battery.getBatteryStateAsync();
      setCharging(state === Battery.BatteryState.CHARGING);
    };
    getBatteryInfo();

    // Listener für Updates
    const subscriptionLevel = Battery.addBatteryLevelListener(
      ({ batteryLevel }) => setBatteryLevel(batteryLevel)
    );

    const subscriptionState = Battery.addBatteryStateListener(
      ({ batteryState }) =>
        setCharging(batteryState === Battery.BatteryState.CHARGING)
    );

    return () => {
      subscriptionLevel.remove();
      subscriptionState.remove();
    };
  }, []);

  if (batteryLevel === null || charging === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Lade Batterie-Info…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔋 Batterie Status</Text>
      <Text style={styles.text}>
        Akkustand: {(batteryLevel * 100).toFixed(0)}%
      </Text>
      <Text style={styles.text}>
        Status: {charging ? "⚡ Wird geladen" : "🔋 Nicht am Laden"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 8,
  },
});
