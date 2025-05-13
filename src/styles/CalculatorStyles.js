import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  displayContainer: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "90%",
    borderRadius: 10,
  },
  displayText: {
    fontSize: 48,
    color: "#fff",
  },
  buttonContainer: {
    flex: 3,
    width: "100%",
    margin: 50,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a", // dunkelgrau für Standard-Tasten
    elevation: 3,
    margin: 2,
  },
  buttonText: {
    fontSize: 34,
    color: "#fff",
  },
  zeroButton: {
    flex: 2,
    paddingLeft: 35,
    paddingRight: 35,
  },
  zeroButtonText: {
    marginLeft: 10,
  },
  operatorButton: {
    backgroundColor: "#fff", // weiß für Operatoren
  },
  operatorButtonText: {
    color: "#000",
  },
  equalButton: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // weiß für Operatoren
    elevation: 3,
  },
  equalButtonText: {
    fontSize: 32,
    color: "#000",
  },
  clearButton: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // weiß für Operatoren
    marginTop: 10,
    elevation: 3,
    padding: 10,
  },
  clearButtonText: {
    fontSize: 24,
    color: "#000",
  },
});
