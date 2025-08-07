import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_MARGIN = 8;
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - ITEM_MARGIN * (NUM_COLUMNS * 3)) / NUM_COLUMNS;

export default StyleSheet.create({
  gridContainer: {
    paddingHorizontal: ITEM_MARGIN,
  },

  menuItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: ITEM_MARGIN,
    borderRadius: 16,
    overflow: "hidden",
    top: 50,
  },

  gradientButton: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },

  label: {
    marginTop: 8,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  topRightButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxHeight: "80%",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#000",
  },

  modalText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 24,
  },

  closeButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-end",
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
