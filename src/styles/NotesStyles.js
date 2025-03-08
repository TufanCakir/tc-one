// src/styles/NotesStyles.js
import { StyleSheet } from "react-native";
import colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: colors.white,
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 18,
    color: colors.white,
    backgroundColor: colors.backgroundLight,
  },
  addButton: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: colors.goldDark,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
  },
  note: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: colors.backgroundLight,
    borderColor: colors.gold,
    borderWidth: 2,
  },
  noteText: {
    fontSize: 18,
    color: colors.white,
  },
  noteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
    color: colors.blueLight,
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    color: colors.redBright,
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
