// src/styles/FallingCirclesRPGStyles.js
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    width: width,
    height: height,
    backgroundColor: "transparent",
  },
  info: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    fontSize: 20,
    color: "#FFD700",
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: height / 2 - 100,
    alignSelf: "center",
    alignItems: "center",
  },
  gameOver: {
    fontSize: 32,
    color: "red",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
  },
  backButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
