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
    marginBottom: 16,
    borderRadius: 10,
    fontSize: 18,
    color: colors.white,
    backgroundColor: colors.backgroundLight,
  },
  addButton: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: colors.yellowBright,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  addButtonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
  },
  priorityButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  priority: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 8,
    color: colors.white,
  },
  activePriority: {
    textDecorationLine: "underline",
    textShadowColor: colors.gold,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  listContainer: {
    paddingBottom: 20,
    marginTop: 20,
  },
  task: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "column",
    backgroundColor: colors.backgroundLight,
  },
  hoch: { backgroundColor: colors.redDark },
  mittel: { backgroundColor: colors.yellowBright },
  niedrig: { backgroundColor: colors.blueBright },
  itemList: {
    fontSize: 18,
    color: colors.white,
    flex: 1,
  },
  doneText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  dueDate: {
    fontSize: 14,
    color: colors.grayLight,
    fontStyle: "italic",
    marginBottom: 8,
  },
  taskButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
});
