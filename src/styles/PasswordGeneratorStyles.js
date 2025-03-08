// src/styles/PasswordGeneratorStyles.js
import { StyleSheet } from "react-native";
import colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: colors.backgroundDark,
    color: colors.white,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 10,
  },
  button: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: colors.backgroundDark,
    fontSize: 16,
    fontWeight: "bold",
  },
  generatedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  generatedInput: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: colors.backgroundDark,
    color: colors.white,
  },
  copyButton: {
    marginLeft: 10,
    backgroundColor: colors.blueBright,
    padding: 10,
    borderRadius: 5,
  },
  successMessage: {
    color: colors.gold,
    textAlign: "center",
    fontSize: 16,
    marginTop: 18,
  },
});
