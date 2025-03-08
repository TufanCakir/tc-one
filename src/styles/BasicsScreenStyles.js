// src/styles/BasicsScreenStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: "#dcdcdc",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "#e0e0e0",
    lineHeight: 26,
    marginBottom: 20,
  },
  highlight: {
    fontWeight: "bold",
    color: "#ffcc00",
  },
  codeTitle: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 10,
  },
  code: {
    fontFamily: "monospace",
    color: "#f8f8f2",
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
  },
  footer: {
    fontSize: 16,
    color: "#b0b0b0",
    textAlign: "center",
    marginTop: 20,
  },
});
