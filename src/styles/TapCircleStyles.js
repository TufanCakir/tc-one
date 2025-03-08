// src/styles/TapCircleStyles.js
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: width,
    height: height / 2,
    borderWidth: 2,
    borderColor: "#000",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    color: "#fff",
  },
  instruction: {
    fontSize: 18,
    marginTop: 20,
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    top: 100,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
});
