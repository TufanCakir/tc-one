import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  gridContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shadow
  },
  label: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },
  topRightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    left: 200,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 14,
    color: "#333",
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  icon: {
    fontSize: 28,
    color: "white",
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    color: "white",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});
