// src/styles/StartScreenStyles.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shadow
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  versionText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  copyrightText: {
    color: "#fff",
    fontSize: 13,
  },
});
