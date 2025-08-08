// src/styles/CalculatorStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  displayContainer: {
    minHeight: 100,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  displayText: {
    fontSize: 48,
    color: "#111",
    fontWeight: "bold",
    textAlign: "right",
  },
  buttonContainer: {
    paddingHorizontal: 12,
    paddingBottom: 30,
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 64,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 28,
    color: "#111",
    fontWeight: "500",
  },
  operatorButton: {
    backgroundColor: "#111",
  },
  operatorButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  zeroButton: {
    flex: 2,
    alignItems: "flex-start",
    paddingLeft: 34,
  },
  zeroButtonText: {
    fontWeight: "500",
  },
  equalButton: {
    backgroundColor: "#111",
    borderRadius: 16,
    marginLeft: 6,
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    elevation: 2,
  },
  equalButtonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    marginHorizontal: 6,
  },
  clearButtonText: {
    fontSize: 22,
    color: "#f00",
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
