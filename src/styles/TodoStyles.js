import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#fff",
  },
  priorityButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  priority: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#999",
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    overflow: "hidden",
  },
  activePriority: {
    color: "#fff",
    backgroundColor: "#333",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 100, // Platz für Footer
  },
});
