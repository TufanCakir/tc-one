import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function OnlineGuard({ children }) {
  const [isConnected, setIsConnected] = useState(null); // ⬅ initial null

  useEffect(() => {
    // Initialen Status abrufen
    NetInfo.fetch().then((state) => {
      const reachable =
        state.isConnected && state.isInternetReachable !== false;
      setIsConnected(reachable);
    });

    // Live-Aktualisierung
    const unsubscribe = NetInfo.addEventListener((state) => {
      const reachable =
        state.isConnected && state.isInternetReachable !== false;
      setIsConnected(reachable);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected === null) {
    // Optional: kleiner Ladescreen beim Initialisieren
    return (
      <View style={styles.overlay}>
        <Text style={styles.subtext}>Verbindung wird geprüft…</Text>
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View style={styles.overlay}>
        <Text style={styles.message}>⚠️ Keine Internetverbindung</Text>
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
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtext: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },
});
