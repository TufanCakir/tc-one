// src/styles/OTPStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    width: "100%",
  },
  otpBox: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  otp: {
    fontSize: 24,
  },
  validText: {
    fontSize: 20,
    color: "green",
    marginTop: 20,
  },
  invalidText: {
    fontSize: 20,
    color: "red",
    marginTop: 20,
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
