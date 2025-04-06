// src/styles/FooterStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  footer: {
    height: 100,
    justifyContent: "center",
    paddingBottom: 10,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 4,
  },
});
