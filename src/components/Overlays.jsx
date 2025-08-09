import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

function Overlay({ message, backgroundColor = "rgba(0,0,0,0.85)" }) {
  return (
    <View style={[styles.overlay, { backgroundColor }]}>
      <ActivityIndicator size="large" color="#fff" />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

export function LoadingOverlay() {
  return <Overlay backgroundColor="#000" />;
}

export function UpdateOverlay() {
  return <Overlay message="Update wird geladen…" />;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
