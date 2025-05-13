// src/styles/NotesStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 18,
    color: "#fff",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    left: 100,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shadow
    margin: 50,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  note: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  noteText: {
    fontSize: 18,
    color: "#fff",
  },
  noteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
