// src/styles/StartScreenStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    width: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  versionText: {
    fontSize: 12,
    color: "white",
    top: 300,
    textAlign: "center",
  },
  copyrightText: {
    fontSize: 12,
    color: "white",
    top: 310,
    textAlign: "center",
  },
});
