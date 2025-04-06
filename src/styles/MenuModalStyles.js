// src/styles/MenuModalStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "black",
  },
  button: {
    flex: 1,
    margin: 5,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
  },
});
