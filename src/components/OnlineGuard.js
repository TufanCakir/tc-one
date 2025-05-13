// src/components/OnlineGuard.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function OnlineGuard({ children }) {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });

    return () => unsubscribe();
  }, []);

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
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },
});
