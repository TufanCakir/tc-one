import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export function LoadingOverlay() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

export function UpdateOverlay() {
  return (
    <View style={styles.overlayDark}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>Update wird geladen…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 999,
  },
  overlayDark: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 1000,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#fff",
  },
});
