import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  // Header wird separat in der Header-Komponente definiert
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Zentriert die Buttons im mittleren Bereich
    paddingHorizontal: 20,
  },
  menuButton: {
    marginBottom: 20,
    width: "50%",
  },
  newsButton: {
    marginBottom: 20,
    width: "50%",
  },
  testModeButton: {
    marginBottom: 10,
    width: "50%",
  },
  thankYouText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});
