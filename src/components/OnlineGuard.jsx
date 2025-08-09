import React, { useMemo } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

export default function OnlineGuard({ children }) {
  const netInfo = useNetInfo();

  const { isChecking, isOnline } = useMemo(() => {
    const checking =
      netInfo.isConnected === null || netInfo.isInternetReachable === null;
    const online = netInfo.isConnected && netInfo.isInternetReachable !== false;
    return { isChecking: checking, isOnline: online };
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  if (isChecking) {
    return (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.subtext}>Verbindung wird geprüft…</Text>
      </View>
    );
  }

  if (!isOnline) {
    return (
      <View style={styles.overlay}>
        <Text style={styles.icon}>📡</Text>
        <Text style={styles.message}>Keine Internetverbindung</Text>
        <Text style={styles.subtext}>
          Bitte überprüfe deine Netzwerkverbindung.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  icon: {
    fontSize: 42,
    marginBottom: 8,
  },
  message: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },
  subtext: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },
});
