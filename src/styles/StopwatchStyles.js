import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 48,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  startButton: {
    backgroundColor: "#fff",
  },
  resetButton: {
    backgroundColor: "#fff",
  },
  pauseButton: {
    backgroundColor: "#fff",
  },
  resumeButton: {
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
