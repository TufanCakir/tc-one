// src/styles/GradientTapChallengeStyles.js
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  targetZone: {
    position: "absolute",
    top: height / 2 - 50,
    width: 100, // TARGET_ZONE_WIDTH
    height: 100,
    borderWidth: 2,
    borderColor: "#FFD700",
    backgroundColor: "blue",
    borderRadius: 10,
  },
  bar: {
    position: "absolute",
    top: height / 2 + 60,
    width: 100, // BAR_WIDTH
    height: 30, // BAR_HEIGHT
    borderRadius: 10,
  },
  backButton: {
    bottom: 100,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
