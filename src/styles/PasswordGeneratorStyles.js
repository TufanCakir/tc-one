import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  switchLabel: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  generatedContainer: {
    marginTop: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    backgroundColor: "#111",
  },
  generatedInput: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 6,
  },
  copyButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  successMessage: {
    color: "#0f0",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
