// src/styles/CalendarStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width: "90%",
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  eventsContainer: {
    width: "90%",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  eventText: {
    color: "white",
    textAlign: "center",
  },
  footerContainer: {
    width: "100%", // 🔹 Verhindert, dass der Footer links klebt
    alignItems: "center", // 🔹 Zentriert den Footer
    paddingVertical: 10, // 🔹 Fügt etwas Abstand hinzu
  },
});
