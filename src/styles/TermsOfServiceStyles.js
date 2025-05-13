// src/styles/TermsOfServiceStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
    paddingBottom: 20,
  },
});
