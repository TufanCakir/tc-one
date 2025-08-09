import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

export default function OnlineGuard({ children }) {
  const netInfo = useNetInfo();

  const isChecking = netInfo.isConnected === null;
  const isOnline = netInfo.isConnected && netInfo.isInternetReachable !== false;

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
    marginTop: 4,
  },
});
