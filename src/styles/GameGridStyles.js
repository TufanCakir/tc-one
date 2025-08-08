import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_MARGIN = 8;
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - ITEM_MARGIN * (NUM_COLUMNS * 3)) / NUM_COLUMNS;

export default StyleSheet.create({
  gridContainer: {
    flex: 1,
    paddingHorizontal: ITEM_MARGIN,
    paddingTop: 30,
  },

  gridContent: {
    paddingHorizontal: ITEM_MARGIN,
  },

  gamesItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: ITEM_MARGIN,
    borderRadius: 16,
    overflow: "hidden",
  },

  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    padding: 12,
  },

  label: {
    marginTop: 8,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
