import { StyleSheet, Dimensions } from "react-native";

window = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollWrapper: {
    height: Dimensions.get("window").height * 0.5,
  },
  entriesContainer: {
    paddingBottom: 16,
  },
  entryBlock: {
    marginBottom: 24,
  },
  entryLabel: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    flex: 1,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shadow
  },
  deleteBtn: {
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shado
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
