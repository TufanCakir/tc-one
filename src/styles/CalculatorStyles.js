// src/styles/CalculatorStyles.js
import { StyleSheet } from "react-native";
import colors from "../../colors";

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
    padding: 20,
    width: "90%",
    borderRadius: 10,
  },
  displayText: {
    fontSize: 48,
    color: colors.white,
  },
  buttonContainer: {
    flex: 3,
    width: "90%",
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
    backgroundColor: colors.blueBright,
    elevation: 3,
    margin: 2,
  },
  buttonText: {
    fontSize: 34,
    color: colors.white,
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
    backgroundColor: colors.goldDark,
  },
  operatorButtonText: {
    color: colors.white,
  },
  equalButton: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.redBright,
    elevation: 3,
  },
  equalButtonText: {
    fontSize: 32,
    color: colors.white,
  },
  clearButton: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayLight,
    marginTop: 10,
    elevation: 3,
    padding: 10,
  },
  clearButtonText: {
    fontSize: 24,
    color: colors.grayDark,
  },
});
