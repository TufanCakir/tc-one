import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header wird separat in der Header-Komponente definiert
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Zentriert die Buttons im mittleren Bereich
  },
});
